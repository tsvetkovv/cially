import PocketBase from "pocketbase";
import registerGuild from "../../../_logic/registerGuild";

// Pocketbase Initialization
const url = process.env.POCKETBASE_URL;
const pb = new PocketBase(url);

let collection_name = process.env.MEMBER_JOINS_COLLECTION
let guild_collection_name = process.env.GUILDS_COLLECTION


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
