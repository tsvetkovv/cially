import PocketBase from "pocketbase";

// Pocketbase Initialization
const url = process.env.POCKETBASE_URL;
const pb = new PocketBase(url);

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
      .getFirstListItem(`discordID='${id}'`, {});
      

      let guildFound = [{ guildID: id }];
      return Response.json({ guildFound });

    
  } catch (err) {
    if (err.status == 400) {
      let notFound = [{ errorCode: 404 }];
      return Response.json({ notFound });
    }
  }
}
