import PocketBase from "pocketbase";

// Pocketbase Initialization
const url = process.env.POCKETBASE_URL;
const pb = new PocketBase(url);

let guild_collection_name = process.env.GUILDS_COLLECTION;

// Main GET Event
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    let API_REQ = await fetch(`${process.env.BOT_API_URL}/syncGuild/${id}`);
    let data = await API_REQ.json();
    let code = data.code;

    if (code == "success") {
      try {
        const guild = await pb
          .collection(guild_collection_name)
          .getFirstListItem(`discordID='${id}'`, {});

        let guildFound = [{ discordID: guild.discordID, name: guild.name, members: guild.members, available: guild.available, discord_partner: guild.discord_partner, creation_date: guild.creation_date, channels: guild.channels, roles: guild.roles, bans: guild.bans, owner_username: guild.owner_username }];
        return Response.json({ guildFound });

      } catch (err) {
        if (err.status == 400) {
          let notFound = [{ errorCode: 404 }];
          return Response.json({ notFound });
        }
      }
    } else {
      let notFound = [{ errorCode: 404 }];
      return Response.json({ notFound });
    }
  } catch (err) {
    console.log(err);
    let notFound = [{ errorCode: 404 }];
    return Response.json({ notFound });
  }
}
