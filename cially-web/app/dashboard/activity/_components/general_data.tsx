import { MessageCircle, UsersRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import BottomCard from "./_main-components/bottom-card";

export default function GeneralActivityData({ }) {


	return (
		<>
			<Card className="mt-10 grid  auto-rows-auto px-10 sm:min-w-dvh">
				<div>
					<div className="text-xl font-semibold">General Data</div>
					<div className="font-sans text-sm mt-1 text-white/60">More insights regarding guild's activity</div>
				</div>
				<div className="grid grid-cols-2 ">
					<div className="">
						<div>Total Members:  <p className="inline text-white/80 font-sans">327</p></div>
						<div>Active Members:  <p className="inline text-white/80 font-sans">120</p></div>
						<div>Innactive Members:  <p className="inline text-white/80 font-sans">207</p></div>

					</div>
					<div>
						<div>Most Mentioned:  <p className="inline text-white/80 font-sans">@skellgreco</p></div>
						<div>Newbie Response Time:  <p className="inline text-white/80 font-sans">12m 10s</p></div>
						<div>Total Responses:  <p className="inline text-white/80 font-sans">282</p></div>
					</div>
				</div>


			</Card>
		</>
	);
}
