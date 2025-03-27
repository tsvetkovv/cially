// Imports
import PocketBase from "pocketbase";

// Initialize Pocketbase URL
const url = process.env.POCKETBASE_URL;

// Pocketbase Initialization
const pb = new PocketBase(url);

// Main Event
export async function POST(request: Request) {
  //TODO add a dynamic way to detect post requests for different listeners

  // Parse the request body and debug it
  const body = await request.json();
  const { guildID, messageID, messageLength, channelID, authorID } = body;
  console.log(`[DEBUG] New POST Request: \n${JSON.stringify(body)}`);

  // Respond to the request. Be kind and don't leave my boy Discord Bot on seen :)
  const roger = {
    response: `Message Received with the following details: GI: ${guildID}, MI: ${messageID}`,
  };

  // Database Logic
  try {
    const guild = await pb
      .collection("guilds")
      .getFirstListItem(`discordID=${guildID}`, {});
    console.log("[DEBUG] Guild has been found and is ready to add data to it");

    // FIXME Multiple messages dont get tracked

    try {
      const messageData = {
        author: authorID,
        guild_id: guild.id,
        channelID: channelID,
        messageLength: messageLength,
      };
      const newMessage = await pb.collection("messages").create(messageData);
      console.log(
        `[DEBUG] Message has been added in the database. ID: ${messageID}`
      );
    } catch (error) {
      console.log(error);
    }

    // Add the guild to the database
  } catch (error) {
    // 404 error -> guild is not on the database. Attempt to add it
    if (error.status == 404) {
      console.log(
        "[DEBUG] Guild is not in the database. Attempting to add it..."
      );
      const guildData = { discordID: guildID };
      try {
        const newGuild = await pb.collection("guilds").create(guildData);
        console.log("[DEBUG] Guild has been added to the database");
      } catch (error) {
        console.log(`\n[DEBUG] Failed to create new guild: \n${error}`);
      }
    } else {
      console.log(
        `\n[DEBUG] Failed to communicate with the Database: \n${error}`
      );
      console.log(`[DEBUG] Error Code: ${error.status}`);
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
  console.log(id);

  const guild = await pb
    .collection("guilds")
    .getFirstListItem(`discordID=${id}`, {});

  console.log(guild.id);

  try {

    // TODO Fetch the timezones correctly

    // you can also fetch all records at once via getFullList
    const records = await pb.collection("messages").getFullList({
      filter: `guild_id ?= "${guild.id}"`,
      sort: "-created",
      expand: "created",
    });

    const dataArray = [];

    let i = 0
    while (i < 25) {
      if (i < 10) {
        dataArray.push({hour: `0${i}`, amount: 0})
      } else {
        dataArray.push({hour: `${i}`, amount: 0})
      }
      
      i = i + 1
    }

    console.log(records)

    records.forEach(record => {
      let minutes = [record.created.slice(11, 13)]
      minutes.forEach(minute => {
        // console.log(minute)
        let position = dataArray.findIndex((item) => item.hour === minute)
        if (position != -1) {
          dataArray[position].amount = dataArray[position].amount + 1
        } else {
          dataArray.push({hour: minute, amount: 1})
        }
        // console.log(position)
      });
      // console.log(minutes)

      
    });
    dataArray.sort((a, b) => a.hour - b.hour)
    console.log(dataArray)

    return Response.json({ dataArray });
  } catch (err) {
    console.log(err);
  }
}
