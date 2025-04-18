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
    desktop: {
        label: "Desktop",
        color: "#03d5ff",
    },
} satisfies ChartConfig

export default function ActiveHours({chartData}) {
    return (

        <Card>
            <CardHeader>
                <CardTitle>Most Active Hours (UTC)</CardTitle>
                <CardDescription>Last 4 weeks</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 10,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="hour"
                            tickLine={true}
                            tickMargin={10}
                            axisLine={true}
                            tickFormatter={(value) => value.slice(0, 2)}
                        />
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="amount" fill="var(--color-desktop)" radius={4}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none text-center">
                    Most Active Hour:<div className="text-gray-300 text-center">20:00</div>
                </div>

            </CardFooter>
        </Card>
    )
}