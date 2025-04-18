"use client"
import { TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Bar, BarChart, YAxis, LabelList } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"




const chartConfig = {
    channel: {
        label: "channel",
        color: "#03d5ff",
    },
} satisfies ChartConfig

export default function ActiveChannels({chartData}) {
    return (

        <Card>
            <CardHeader className="items-center">
                <CardTitle>Most Active Channels</CardTitle>
                <CardDescription>Last 4 weeks</CardDescription>

            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[322px]"
                >
                    <RadarChart data={chartData} >
                        <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey="channel" />
                        <PolarGrid />
                        <Radar
                            dataKey="amount"
                            fill="var(--color-channel)"
                            fillOpacity={0.6}
                            dot={{
                                r: 4,
                                fillOpacity: 1,
                            }}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none text-center">
                    Most Active Channel:<div className="text-gray-300">{chartData[0].channel}</div>
                </div>

            </CardFooter>
        </Card>
    )
}