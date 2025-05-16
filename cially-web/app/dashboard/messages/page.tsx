"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GuildNotFound from "@/app/_components/_events/guildNotFound";
import LoadingSVG from "@/app/_components/_events/loading-page";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Last4Weeks from "./_components/_message-charts/last_4weeks";
import Last7d from "./_components/_message-charts/last_7d";
import Last24h from "./_components/_message-charts/last_24hrs";
import ActiveChannels from "../activity/_components/active_channels";
import ActiveHours from "../activity/_components/active_hours";
import ActiveUsers from "../activity/_components/active_users";
import GeneralMessageDataCard from "./_components/_message-charts/general_data";
import { Skeleton } from "@/components/ui/skeleton";

// FIXME Error when there are no messages

import { Suspense } from "react";
import {useEnv} from "@/app/_components/_env/provider";

export default function MessagesActivityPage() {
	return (
		<Suspense>
			<ClientComponent />
		</Suspense>
	)
}

function ClientComponent() {
	const searchParams = useSearchParams();
	const guildID = searchParams.get("guildID");
	const [chartData, setChartData] = useState([{ amount: 69 }]);
	const { NEXT_PUBLIC_WEBSITE_URL: WEBSITE_URL } = useEnv();

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
		return <GuildNotFound />
	} else if (!chartData.finalData) {
		return (
			<>
				<div className="mt-10 ml-10 text-2xl">Messages Analytics</div>
				<hr className="mt-2 mr-5 ml-5 w-50 sm:w-dvh"></hr>

				<div className="mt-10 ml-8 grid max-w-80 grid-rows-3 gap-y-4 sm:mr-5 sm:ml-10 sm:max-w-full sm:grid-cols-3 sm:grid-rows-none sm:gap-x-3 sm:gap-y-0">
				<Skeleton className="w-[250px] h-[150px] place-self-center rounded-xl" />
				<Skeleton className="w-[250px] h-[150px] place-self-center rounded-xl" />
				<Skeleton className="w-[250px] h-[150px] place-self-center rounded-xl" />
					
				</div>

				<div className="ml-10 mr-5">
				<Skeleton className="mt-50 w-dvh h-[150px] place-self-center rounded-xl" />
				</div>


				<div className="mt-5 pb-5 text-center text-gray-600 text-xs">
					Thanks for using Cially Dashboard!
				</div>
			</>
		);
	} else {
		let data_24h = chartData.finalData[0].HourData;
		let data_7d = chartData.finalData[0].WeekData;
		let data_4w = chartData.finalData[0].FourWeekData;
		let data_general = chartData.finalData[0].GeneralData;


		return (
			<>
				<div className="mt-10 ml-10 text-2xl">Messages Analytics</div>
				<hr className="mt-2 mr-5 ml-5 w-50 sm:w-dvh"></hr>

				<div className="mt-10 ml-8 grid max-w-80 grid-rows-3 gap-y-4 sm:mr-5 sm:ml-10 sm:max-w-full sm:grid-cols-3 sm:grid-rows-none sm:gap-x-3 sm:gap-y-0">
					<Last24h chartData={data_24h} />
					<Last7d chartData={data_7d} />
					<Last4Weeks chartData={data_4w} />
				</div>

				<div className="ml-10 mr-5">
					<GeneralMessageDataCard chartData={data_general} />
				</div>


				<div className="mt-5 pb-5 text-center text-gray-600 text-xs">
					Thanks for using Cially Dashboard!
				</div>
			</>
		);
	}
}
