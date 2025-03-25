import { MessageChart } from "@/app/(components)/chart-preview";

const chartData = [
  { day: "January", desktop: 186 },
  { day: "February", desktop: 305 },
  { day: "March", desktop: 237 },
  { day: "April", desktop: 73 },
  { day: "May", desktop: 209 },
  { day: "June", desktop: 214 },
];

export async function DataDashboard({ guildID }) {
    /* const data = await fetch(`/api/server/${guildID}`)
    console.log(data) */

    return (
        <>
        <MessageChart chartData={chartData} />
        </>
    )
}