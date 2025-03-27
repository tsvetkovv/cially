"use client"

import { MessageChart } from "@/app/(components)/chart-preview";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'

/* const chartData = [
  { day: "January", desktop: 186 },
  { day: "February", desktop: 305 },
  { day: "March", desktop: 237 },
  { day: "April", desktop: 73 },
  { day: "May", desktop: 209 },
  { day: "June", desktop: 214 },
]; */

export default function DataDashboard() {
  const searchParams = useSearchParams()
  const guildID = searchParams.get('guildID')
  const [chartData, setChartData] = useState([{ amount: 69 }]);

  useEffect(() => {
    async function fetchData() {
      let chartDataReceived = await fetch(
        `http://localhost:3000/api/server/${guildID}`
      );
      let json = await chartDataReceived.json()
      setChartData(json)
    }
    fetchData();
    console.log(chartData);
  }, []);

  if (!chartData.dataArray) {
    return <>loading</>;
  } else {
    return (
      <>
        <MessageChart chartData={chartData.dataArray} />
      </>
    );
  }
  
}
