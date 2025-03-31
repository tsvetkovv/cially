"use client";

import { MessageChart } from "@/app/_components/chart-preview";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


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
    return <>Guild not found</>;
  } else if (!chartData.dataArray) {
    return <>Loading</>;
  } else {
    return (
      <>
        <MessageChart chartData={chartData.dataArray} />
      </>
    );
  }
}
