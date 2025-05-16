"use client";

import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageChart } from "@/app/_components/_dashboard/chart-preview";
import GuildNotFound from "../_components/_events/guildNotFound";
import LoadingSVG from "../_components/_events/loading-page";
import { Suspense } from "react";
import {useEnv} from "@/app/_components/_env/provider";


function ClientComponent() {
	const searchParams = useSearchParams();
	const guildID = searchParams.get("guildID");
	const [chartData, setChartData] = useState([{ amount: 69 }]);
	const { WEBSITE_URL } = useEnv();

	useEffect(() => {
		async function fetchData() {
			let chartDataReceived = await fetch(
				`${WEBSITE_URL}/api/server/${guildID}/fetchGuild`,
			);
			let json = await chartDataReceived.json();
			setChartData(json);
		}
		fetchData();
	}, [guildID]);

	if (chartData.notFound) {
		return <GuildNotFound />;
	} else if (!chartData.guildFound) {
		return <LoadingSVG />;
	} else {
		redirect(`dashboard?guildID=${guildID}`);
	}
}

export default function DataDashboard() {
	return (
	  <Suspense fallback={<LoadingSVG />}>
		<ClientComponent />
	  </Suspense>
	);
  }