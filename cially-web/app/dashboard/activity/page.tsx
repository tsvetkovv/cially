"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GuildNotFound from "@/app/_components/_events/guildNotFound";
import LoadingSVG from "@/app/_components/_events/loading-page";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ActiveChannels from "../activity/_components/active_channels";
import ActiveHours from "../activity/_components/active_hours";
import ActiveUsers from "../activity/_components/active_users";
import GeneralActivityData from "./_components/general_data";
import { Skeleton } from "@/components/ui/skeleton";

// FIXME Error when there are no messages

import { Suspense } from "react";
import {useEnv} from "@/app/_components/_env/provider";

export default function MessagesDashboard() {
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
    const { WEBSITE_URL } = useEnv();

    useEffect(() => {
        async function fetchData() {
            let chartDataReceived = await fetch(
                `${WEBSITE_URL}/api/server/${guildID}/fetchActivityData`,
            );
            let json = await chartDataReceived.json();
            setChartData(json);
            console.log(json)
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
        let data_channels = chartData.finalData[0].ChannelData;
        let data_users = chartData.finalData[0].ActiveUsersData;
        let data_hours = chartData.finalData[0].ActiveHourData;
        let data_general = chartData.finalData[0].GeneralData;

        return (
            <>

                <div className="mt-10 ml-10 text-2xl">Activity Analytics</div>
                <hr className="mt-2 mr-5 ml-5 w-50 sm:w-dvh"></hr>

                <div className="h-[90%]">

                    <div className="grid grid-cols-1 w-[40%] sm:w-[85%] sm:grid-cols-2 ml-10 mr-5 mt-10 gap-5">
                        <div>
                            <ActiveChannels chartData={data_channels} />
                        </div>
                        <div>
                            <ActiveUsers chartData={data_users} />
                        </div>
                    </div>

                    <div className="ml-10 mr-5 mt-5 w-[40%] sm:w-[85%]">
                        <ActiveHours chartData={data_hours} />

                        <div className="mt-5">
                            <GeneralActivityData chartData={data_general} />

                        </div>

                    </div>
                </div>



                <div className="mt-5 pb-5 text-center text-gray-600 text-xs">
                    Thanks for using Cially Dashboard!
                </div>
            </>
        );
    }
}
