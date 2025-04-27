"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GuildNotFound from "@/app/_components/_events/guildNotFound";
import LoadingSVG from "@/app/_components/_events/loading-page";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Last4Weeks from "./_components/_top-charts/last_4weeks";
import Last7d from "./_components/_top-charts/last_7d";
import Last24h from "./_components/_top-charts/last_24hrs";
import ActiveChannels from "./_components/bottom-charts/active_channels";
import ActiveHours from "./_components/bottom-charts/active_hours";
import ActiveUsers from "./_components/bottom-charts/active_users";

let WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;

export default function MessagesDashboard() {
	const searchParams = useSearchParams();
	const guildID = searchParams.get("guildID");
	const [chartData, setChartData] = useState([{ amount: 69 }]);

	useEffect(() => {
		async function fetchData() {
			let chartDataReceived = await fetch(
				`${WEBSITE_URL}/api/server/${guildID}/fetchMessageData`,
			);
			let json = await chartDataReceived.json();
			setChartData(json);
		}
		fetchData();
	}, [guildID]);

	if (chartData.notFound) {
		return <GuildNotFound />;
	} else if (!chartData.finalData) {
		return (
			<div className="translate-x-100">
				<LoadingSVG />
			</div>
		);
	} else {
		let data_24h = chartData.finalData[0].HourData;
		let data_7d = chartData.finalData[0].WeekData;
		let data_4w = chartData.finalData[0].FourWeekData;
		let data_channels = chartData.finalData[0].ChannelData;
		let data_users = chartData.finalData[0].ActiveUsersData;
		let data_hours = chartData.finalData[0].ActiveHourData;

		return (
			<>
				<div className="text-2xl mt-10 ml-10">Messages Analytics</div>
				<hr className="ml-5 mt-2 w-50 sm:w-dvh mr-5"></hr>

				<div className="grid grid-rows-3 sm:grid-rows-none sm:grid-cols-3 max-w-80 sm:max-w-full mt-10 sm:ml-10 ml-8 gap-y-4 sm:gap-y-0 sm:gap-x-3 sm:mr-5">
					<Last24h chartData={data_24h} />
					<Last7d chartData={data_7d} />
					<Last4Weeks chartData={data_4w} />
				</div>

				<div className="text-2xl mt-10 ml-10">Activity Analytics</div>
				<hr className="ml-5 mt-2 w-50 sm:w-dvh mr-5"></hr>

				<div className="container mx-auto px-4 py-8 max-w-95 sm:max-w-240">
					<ScrollArea className="w-full rounded-md border">
						<div className="flex space-x-4 p-4">
							<div className="min-w-[300px] flex-shrink-0">
								<ActiveChannels chartData={data_channels} />
							</div>
							<div className="min-w-[300px] flex-shrink-0">
								<ActiveHours chartData={data_hours} />
							</div>
							<div className="min-w-[300px] flex-shrink-0">
								<ActiveUsers chartData={data_users} />
							</div>
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</div>

				<div className="text-center mt-5 text-xs text-gray-600 pb-5">
					Thanks for using Cially Dashboard!
				</div>
			</>
		);
	}
}
