"use client";

import Last24h from "./_components/_top-charts/last_24hrs"
import Last7d from "./_components/_top-charts/last_7d"
import Last4Weeks from "./_components/_top-charts/last_4weeks"
import ActiveChannels from "./_components/bottom-charts/active_channels"
import ActiveUsers from "./_components/bottom-charts/active_users"
import ActiveHours from "./_components/bottom-charts/active_hours"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingSVG from "@/app/_components/_events/loading-page";
import GuildNotFound from "@/app/_components/_events/guildNotFound";

export default function MessagesDashboard() {
    const searchParams = useSearchParams();
    const guildID = searchParams.get("guildID");
    const [chartData, setChartData] = useState([{ amount: 69 }]);

    useEffect(() => {

        // TODO make it dynamic
        async function fetchData() {
            let chartDataReceived = await fetch(
                `http://localhost:3000/api/server/${guildID}/fetchMessageData`, {
                cache: 'force-cache',
            });
            let json = await chartDataReceived.json();
            setChartData(json);

        }
        fetchData();
    }, []);

    if (chartData.notFound) {
        return <GuildNotFound />
    } else if (!chartData.finalData) {
        return <div className="translate-x-100">
            <LoadingSVG />
        </div>
    } else {
        console.log(chartData);
        let data_24h = chartData.finalData[0].HourData
        let data_7d = chartData.finalData[0].WeekData
        let data_4w = chartData.finalData[0].FourWeekData

        return (
            <>
                <div className="text-2xl mt-10 ml-10">Messages Analytics</div>
                <hr className="ml-5 mt-2 w-dvh mr-5"></hr>

                <div className="grid grid-cols-3 mt-10 mx-10 gap-x-3">

                    <Last24h chartData={data_24h} />
                    <Last7d chartData={data_7d} />
                    <Last4Weeks chartData={data_4w}/>

                </div>

                <div className="text-2xl mt-10 ml-10">Activity Analytics</div>
                <hr className="ml-5 mt-2 w-dvh mr-5"></hr>

                <div className="grid grid-cols-3 mt-10 mx-10 gap-x-3">


                    <ActiveChannels />

                    <ActiveUsers />

                    <ActiveHours />

                </div>
                <div className="text-center mt-5 text-xs text-gray-600 pb-5">
                    Thanks for using Cially Dashboard!
                </div>
            </>
        )
    }

}