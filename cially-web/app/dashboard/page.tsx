import BottomCard from "./_main-components/bottom-card";
import MemberBlock from "./_main-components/member-card";
import MessagesBlock from "./_main-components/messages-card";

let WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;

export default async function Dashboard({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const guildID = (await searchParams).guildID;

	let API_REQ = await fetch(`${WEBSITE_URL}/api/server/${guildID}/fetchGuild`);
	let data = await API_REQ.json();

	let guild = data.guildFound[0];
	const date = new Date();
	let new_date = date.toLocaleString("en-US");
	let welcome_message = String(new_date).includes("AM")
		? "Good Morning"
		: "Good Evening";

	return (
		<>
			<div className="grid grid-rows-3 sm:grid-rows-none ml-10 mt-10 sm:min-w-dvh mr-4">
				<div>
					<div className="grid grid-rows-3 sm:grid-rows-none sm:grid-cols-8 rows-span-1 ">
						<div className="sm:col-span-2 text-4xl ">
							{welcome_message}
							<div className="text-gray-400 text-xs font-normal mt-2">
								Currently viewing {guild.name}
							</div>
						</div>
						<div className="sm:col-start-4 sm:col-span-2 mr-4">
							<MemberBlock guild={guild} />
						</div>
						<div className="sm:col-start-6 sm:col-span-2 mr-4">
							<MessagesBlock guild={guild} />
						</div>
					</div>
				</div>

				<div className="row-span-3 sm:row-span-1">
					<BottomCard guild={guild} />
					<div className="text-center mt-5 text-xs text-gray-600 pb-5">
						Thanks for using Cially Dashboard!
					</div>
				</div>
			</div>
		</>
	);
}
