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

// const chartData = [
//     { month: "January", desktop: 186 },
//     { month: "February", desktop: 305 },
//     { month: "March", desktop: 237 },
//     { month: "April", desktop: 73 },
//     { month: "May", desktop: 209 },
//     { month: "June", desktop: 214 },
// ]



const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#03d5ff",
    },
} satisfies ChartConfig

export default function ActiveUsers({ chartData }) {
    return (

        <Card>
            <CardHeader>
                <CardTitle>Most Active Users</CardTitle>
                <CardDescription>Last 4 weeks</CardDescription>
            </CardHeader>
            <CardContent className="pb-2 max-h-[422px]">
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{ left: 100, right: -80 }}
                        barCategoryGap={20}
                    >
                        <YAxis
                            dataKey="author"
                            type="category"
                            tickLine={false}
                            axisLine={false}
                            tick={{
                                fill: "#cbd5e1", // Tailwind's slate-300
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        />
                        <XAxis dataKey="amount" type="number" hide />
                        <ChartTooltip
                            cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="amount" layout="vertical" radius={[5, 5, 5, 5]} fill="#03d5ff" />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-center gap-2 text-sm">
                <div className="gap-2 font-medium leading-none text-center">
                    Most Active User: <div className="text-gray-300 text-center inline">{chartData[0].author}</div>
                </div>
            </CardFooter>
        </Card>
    )
}