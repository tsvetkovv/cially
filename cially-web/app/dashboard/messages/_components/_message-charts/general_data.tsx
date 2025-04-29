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

export default function GeneralMessageDataCard({ }) {


	return (
		<>
			<Card className="mt-10 grid  auto-rows-auto px-10 sm:min-w-dvh">
				<div>
					<div className="text-xl font-semibold">General Data</div>
					<div className="font-sans text-sm mt-1 text-white/60">More insights regarding the messages and their content</div>
				</div>
				<div className="grid grid-cols-2 ">
					<div className="">
						<div>Total Messages:  <p className="inline text-white/80 font-sans">190239812</p></div>
						<div>Average Word Count:  <p className="inline text-white/80 font-sans">7</p></div>
						<div>Most Used Word:  <p className="inline text-white/80 font-sans">duck</p></div>

					</div>
					<div>
						<div>Total Message Deletions:  <p className="inline text-white/80 font-sans">237</p></div>
						<div>Total Message Edits:  <p className="inline text-white/80 font-sans">65</p></div>
						<div>Total Attachments:  <p className="inline text-white/80 font-sans">28</p></div>
					</div>
				</div>


			</Card>
		</>
	);
}
