"use client";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
	Bar,
	BarChart,
	LabelList,
	PolarAngleAxis,
	PolarGrid,
	Radar,
	RadarChart,
	YAxis,
} from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "#03d5ff",
	},
} satisfies ChartConfig;

export default function ActiveHours({ chartData }) {
	return (
		<Card className="w-full h-full">
			<CardHeader>
				<CardTitle>Most Active Hours (UTC)</CardTitle>
				<CardDescription>Last 4 weeks</CardDescription>
			</CardHeader>
			<CardContent className="pt-2 pb-4">
				<ChartContainer
					config={chartConfig}
					className="w-full"
					style={{ height: "300px" }} // Set explicit height
				>
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 20,
							bottom: 20,
							left: 10,
							right: 10,
						}}
						height={260} // Set explicit height for the BarChart
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
			<CardFooter className="flex justify-center items-center gap-2 text-sm"></CardFooter>
		</Card>
	);
}
