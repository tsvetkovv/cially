"use client";

import { MessageChart } from "@/app/_components/chart-preview";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingSVG from "../_components/loading-page";
import GuildNotFound from "../_components/guildNotFound";

export default function DataDashboard() {
  const searchParams = useSearchParams();
  const guildID = searchParams.get("guildID");
  const [chartData, setChartData] = useState([{ amount: 69 }]);

  useEffect(() => {
    async function fetchData() {
      let chartDataReceived = await fetch(
        `http://localhost:3000/api/server/${guildID}/messageCreate`
      );
      let json = await chartDataReceived.json();
      setChartData(json);
    }
    fetchData();
    console.log(chartData);
  }, []);

  if (chartData.notFound) {
    return <GuildNotFound />
  } else if (!chartData.dataArray) {
    return <LoadingSVG />
  } else {
    return (
      <>
        {<MessageChart chartData={chartData.dataArray} />}
      </>
    );
    
  }

}
