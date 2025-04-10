import BottomCard from "./_main-components/bottom-card";
import MemberBlock from "./_main-components/member-card";
import MessagesBlock from "./_main-components/messages-card";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const guildID = (await searchParams).guildID;

  //TODO change to dynamic fetch

  // CURRENTLY DISABLED DUE TO MULTIPLE FETCH REQUESTS DURING TESTING
  let API_REQ = await fetch(`http://localhost:3000/api/server/${guildID}/fetchGuild`)
  let data = await API_REQ.json()
/* 
  let data = {
    guildFound: [
      {
        discordID: "1247194176638947389",
        name: "Σκελλινό Μαγειρείο",
        members: 5,
        available: "true",
        discord_partner: "false",
        creation_date: "2024-06-03T14:24:23.458Z",
        channels: 11,
        roles: 5,
        bans: 0,
        owner_username: "skellgreco",
      },
    ],
  }; */

  let guild = data.guildFound[0];

  return (
    <>
      <div className="grid grid-rows-3 ml-10 mt-10 min-w-dvh mr-4">
        <div>
          <div className="grid grid-cols-8 rows-span-1">
            <div className="col-span-2 text-4xl ">
              Good Evening!
              <div className="text-gray-400 text-xs font-normal mt-2">
                Currently viewing {guild.name}
              </div>
            </div>
            <div className="col-start-4 col-span-2 mr-4">
              <MemberBlock guild={guild} />
            </div>
            <div className="col-start-6 col-span-2 mr-4">
              <MessagesBlock guild={guild} />
            </div>
          </div>
        </div>

        <div className="row-span-3">
          <BottomCard guild={guild} />
        </div>
        <div className="text-center mt-10 text-xs text-gray-600">
          Thanks for using Cially Dashboard!
        </div>
      </div>
    </>
  );
}
