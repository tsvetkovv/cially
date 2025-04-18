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



export default function Last4Weeks({ chartData }) {

    const chartConfig = {
        amount: {
            label: "amount",
            color: "#03d5ff",
        },
    } satisfies ChartConfig

    return (

        <Card>
            <CardHeader>
                <CardTitle>Last 4 weeks days</CardTitle>
                <CardDescription>
                    Showing total messages for the last 4 weeks
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 15,
                            right: 15,
                        }}
                    >
                        <CartesianGrid vertical={true} />
                        <XAxis
                            dataKey="factor"
                            tickLine={true}
                            axisLine={true}
                            tickMargin={0}
                            tickFormatter={(value) => value.slice(0, 6)}
                            interval={0}
                            tick={{
                                angle: -30,
                                fontSize: 10,
                                dx: -5,
                                dy: 5,
                              }}
                        />
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent indicator="dot" hideLabel />}
                        />
                        <Area
                            dataKey="amount"
                            type="linear"
                            fill="var(--color-amount)"
                            fillOpacity={0.4}
                            stroke="var(--color-amount)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            -10% than last week <TrendingDown className="h-4 w-4" />
                        </div>

                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}