import PocketBase from "pocketbase";

// Pocketbase Initialization
const url = process.env.POCKETBASE_URL;
const pb = new PocketBase(url);

// Main GET Event
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const guild = await pb
      .collection("guilds")
      .getFirstListItem(`discordID=${id}`, {});
      let guildFound = [{ guildID: id }];
      return Response.json({ guildFound });
    
  } catch (err) {
    if (err.status == 400) {
      let notFound = [{ errorCode: 404 }];
      return Response.json({ notFound });
    }
  }
}
