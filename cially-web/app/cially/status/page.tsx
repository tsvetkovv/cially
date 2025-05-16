"use client"
import { useEffect, useState } from "react";
import GuildNotFound from "@/app/_components/_events/guildNotFound";
import LoadingSVG from "@/app/_components/_events/loading-page";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge';

import { Database, Rss, CheckCircle, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {useEnv} from "@/app/_components/_env/provider";


export default function Status() {
    const [statusData, setStatusData] = useState([{ amount: 69 }]);
    const { WEBSITE_URL } = useEnv();

    useEffect(() => {
        async function fetchData() {
            let chartDataReceived = await fetch(
                `${WEBSITE_URL}/api/cially/checkStatus`,
            );
            let json = await chartDataReceived.json();
            setStatusData(json);
            console.log(json)
        }
        fetchData();
    }, []);

    if (statusData.pocketbase) {
        return <GuildNotFound />
    } else if (!statusData[0].pocketbase) {
        return (
            <div className="translate-x-100">
                <LoadingSVG />
            </div>
        );
    } else {
        let botStatus = statusData[1].bot
        let pbStatus = statusData[0].pocketbase

        return (
            <>
                <div className="min-w-screen min-h-dvh ">
                    <div>

                        <div className="text-2xl mt-4 ml-2">
                            Status
                        </div>
                        <div className="text-sm text-white/50 mt-1 ml-2">
                            Check if Cially's Services are operating normally
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto -ml-0 mr-10">
                        <Card className="transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-2">
                                <div className="flex items-center">
                                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                                        <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">Pocketbase</CardTitle>
                                        <CardDescription>Database Service</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mt-2">
                                    <Badge variant={pbStatus === "online" ? "success" : "destructive"} className={pbStatus === "online" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}>
                                        <div className="flex items-center">
                                            {pbStatus === "online" ? (
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                            ) : (
                                                <XCircle className="w-4 h-4 mr-1" />
                                            )}
                                            {pbStatus === "online" ? "Online" : "Offline"}
                                        </div>
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-2">
                                <div className="flex items-center">
                                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">
                                        <Rss className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">Discord Bot & API #2</CardTitle>
                                        <CardDescription>Communication Service</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mt-2">
                                    <Badge variant={botStatus === "online" ? "success" : "destructive"} className={botStatus === "online" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}>
                                        <div className="flex items-center">
                                            {botStatus === "online" ? (
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                            ) : (
                                                <XCircle className="w-4 h-4 mr-1" />
                                            )}
                                            {botStatus === "online" ? "Online" : "Offline"}
                                        </div>
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </>
        )
    }
}