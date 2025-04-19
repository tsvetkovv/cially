"use client";

import { MessageChart } from "@/app/_components/_dashboard/chart-preview";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingSVG from "../_components/_events/loading-page";
import GuildNotFound from "../_components/_events/guildNotFound";
import { redirect } from 'next/navigation'
let WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL

export default function DataDashboard() {
  const searchParams = useSearchParams();
  const guildID = searchParams.get("guildID");
  const [chartData, setChartData] = useState([{ amount: 69 }]);
  
  useEffect(() => {
    async function fetchData() {
      let chartDataReceived = await fetch(
        `${WEBSITE_URL}/api/server/${guildID}/fetchGuild`
      );
      let json = await chartDataReceived.json();
      setChartData(json);
    }
    fetchData();
  }, []);
  
  
  if (chartData.notFound) {
    return <GuildNotFound />
  } else if (!chartData.guildFound) {
    return <LoadingSVG />
  } else {

    redirect(`dashboard?guildID=${guildID}`)
    
  }

}
