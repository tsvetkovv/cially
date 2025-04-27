import { MessageCircle, UsersRound } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function MessagesBlock({ guild }) {
	// let correct_msg_difference = (guild.msg_day_difference > 0) ? `+${guild.msg_day_difference} messages than yesterday`

	return (
		<>
			<Card className="">
				<CardHeader>
					<CardTitle className="text-sm">
						<MessageCircle className="inline -translate-y-0.5 mr-2" />
						Messages Today
					</CardTitle>
					<CardDescription className="text-gray-300 text-2xl">
						{guild.today_msg}
						<div className="text-xs mt-2">
							{guild.msg_day_difference > 0 ? (
								<div className="text-green-400">
									+{guild.msg_day_difference} than yesterday
								</div>
							) : guild.msg_day_difference !== 0 ? (
								<div className="text-red-400">
									{guild.msg_day_difference} than yesterday
								</div>
							) : (
								<div className="text-gray-400">
									+{guild.msg_day_difference} than yesterday
								</div>
							)}
						</div>
					</CardDescription>
				</CardHeader>
			</Card>
		</>
	);
}
