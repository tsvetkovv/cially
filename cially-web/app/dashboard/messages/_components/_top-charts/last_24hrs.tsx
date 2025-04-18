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




export default function Last24h({ chartData }) {


    const chartConfig = {
        hour: {
            label: "hour",
            color: "#03d5ff",
        },
    } satisfies ChartConfig

    return (

        <Card>
            <CardHeader>
                <CardTitle>Last 24 hours (UTC)</CardTitle>
                <CardDescription>
                    Showing total messages for the last 24 hours
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={true} />
                        <XAxis
                            dataKey="hour"
                            type="number"
                            domain={[0, 24]}
                            ticks={[0, 3, 6, 9, 12, 15, 18, 21, 24]}
                            tickFormatter={(value) => String(value).padStart(2, '0')}
                            tickLine={true}
                            axisLine={true}
                            tickMargin={5}
                            
                        />
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent indicator="dot" hideLabel />}
                        />

                        <Area
                            dataKey="amount"
                            type="linear"
                            fill="var(--color-hour)"
                            fillOpacity={0.4}
                            stroke="var(--color-hour)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            +5% Increase this hour <TrendingUp className="h-4 w-4" />
                        </div>

                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}