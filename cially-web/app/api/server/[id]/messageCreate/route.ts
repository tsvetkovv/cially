//TODO add a dynamic way to detect post requests for different listeners

import PocketBase from "pocketbase";
import registerGuild from "../../../_logic/registerGuild";

// Pocketbase Initialization
const url = process.env.POCKETBASE_URL;
const pb = new PocketBase(url);

let collection_name = process.env.MESSAGE_COLLECTION
let guild_collection_name = process.env.GUILDS_COLLECTION


// POST Event
export async function POST(request: Request) {

  // Parse the request body and debug it
  const body = await request.json();
  const { guildID, messageID, messageLength, channelID, authorID } = body;

  console.log(`[DEBUG] New POST Request: \n${JSON.stringify(body)}`);

  // Response to the request. Be kind and don't leave my boy Discord Bot on seen :)
  const roger = {
    response: `Message Received with the following details: GI: ${guildID}, MI: ${messageID}`,
  };

  // Database Logic
  try {
    const guild = await pb
      .collection(guild_collection_name)
      .getFirstListItem(`discordID='${guildID}'`, {});
    console.log("[DEBUG] Guild has been found and is ready to add data to it");

    // FIXME Multiple messages dont get tracked

    try {
      const itemData = {
        author: authorID,
        guildID: guild.id,
        channelID: channelID,
        messageLength: messageLength,
      };
      const newMessage = await pb.collection(collection_name).create(itemData);
      console.log(
        `[DEBUG] Message has been added in the database. ID: ${messageID}`
      );
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    // 404 error -> guild is not on the database. Attempt to add it
    if (error.status == 404) {
      registerGuild(guildID);
    } else {
      console.log(
        `\n[DEBUG] Failed to communicate with the Database: \n${error}`
      );
      console.log(`[ERROR] Error Code: ${error.status}`);
    }
  }

  console.log(
    `[DEBUG] End of logic. Stopping the communication and returning a response to the Bot`
  );
  return new Response(JSON.stringify(roger), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

// Main GET Event
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const guild = await pb
      .collection(guild_collection_name)
      .getFirstListItem(`discordID=${id}`, {});

    try {
      // TODO Fetch the timezones correctly

      // you can also fetch all records at once via getFullList
      const records = await pb.collection(collection_name).getFullList({
        filter: `guildID ?= "${guild.id}"`,
        sort: "-created",
        expand: "created",
      });

      const dataArray = [];

      let i = 0;
      while (i < 25) {
        if (i < 10) {
          dataArray.push({ hour: `0${i}`, amount: 0 });
        } else {
          dataArray.push({ hour: `${i}`, amount: 0 });
        }

        i = i + 1;
      }


      records.forEach((record) => {
        let minutes = [record.created.slice(11, 13)];
        minutes.forEach((minute) => {
          let position = dataArray.findIndex((item) => item.hour === minute);
          if (position != -1) {
            dataArray[position].amount = dataArray[position].amount + 1;
          } else {
            dataArray.push({ hour: minute, amount: 1 });
          }
        });
      });
      dataArray.sort((a, b) => a.hour - b.hour);
      return Response.json({ dataArray });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    if (err.status == 400) {
      let notFound = [{ errorCode: 404 }];
      return Response.json({ notFound });
    }
  }
}
