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
const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]



const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#03d5ff",
    },
} satisfies ChartConfig

export default function MessagesDashboard() {
    return (
        <>
            <div className="text-2xl mt-10 ml-10">Messages Analytics</div>
            <hr className="ml-5 mt-2 w-dvh mr-5"></hr>

            <div className="grid grid-cols-3 mt-10 mx-10 gap-x-3">


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
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                                />

                                <Area
                                    dataKey="desktop"
                                    type="linear"
                                    fill="var(--color-desktop)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-desktop)"
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

                <Card>
                    <CardHeader>
                        <CardTitle>Last 7 days</CardTitle>
                        <CardDescription>
                            Showing total messages for the last 7 days
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
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                                />
                                <Area
                                    dataKey="desktop"
                                    type="linear"
                                    fill="var(--color-desktop)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-desktop)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full items-start gap-2 text-sm">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2 font-medium leading-none">
                                    -10% than yesterday <TrendingDown className="h-4 w-4" />
                                </div>

                            </div>
                        </div>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Last 4 weeks</CardTitle>
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
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                                />
                                <Area
                                    dataKey="desktop"
                                    type="linear"
                                    fill="var(--color-desktop)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-desktop)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full items-start gap-2 text-sm">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2 font-medium leading-none">
                                    -3% than the previous week <TrendingDown className="h-4 w-4" />
                                </div>


                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            <div className="text-2xl mt-10 ml-10">Activity Analytics</div>
            <hr className="ml-5 mt-2 w-dvh mr-5"></hr>

            <div className="grid grid-cols-3 mt-10 mx-10 gap-x-3">


                <Card>
                    <CardHeader className="items-center">
                        <CardTitle>Most Active Channels</CardTitle>
                        <CardDescription>Last 4 weeks</CardDescription>

                    </CardHeader>
                    <CardContent className="pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[250px]"
                        >
                            <RadarChart data={chartData}>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                <PolarAngleAxis dataKey="month" />
                                <PolarGrid />
                                <Radar
                                    dataKey="desktop"
                                    fill="var(--color-desktop)"
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
                            Most Active Channel:<div className="text-gray-300">general-chat</div>
                        </div>

                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Most Active Users</CardTitle>
                        <CardDescription>Last 4 weeks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <BarChart
                                accessibilityLayer
                                data={chartData}
                                layout="vertical"
                                margin={{
                                    left: 0,
                                }}
                            >
                                <YAxis
                                    dataKey="month"
                                    type="category"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) =>
                                        chartConfig[value as keyof typeof chartConfig]?.label
                                    }
                                />
                                <XAxis dataKey="desktop" type="number" hide />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar dataKey="desktop" layout="vertical" radius={5} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none place-items-center">
                            Most Active User:<div className="text-gray-300 text-center">skell-greco</div>
                        </div>
                    </CardFooter>
                </Card>

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
                                    top: 20,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
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
            </div>
        </>
    )
}