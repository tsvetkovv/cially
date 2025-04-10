import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { UsersRound, MessageCircle } from "lucide-react";


export default function MemberBlock({guild}) {
    return (
        <>
        <Card className="">
                <CardHeader>
                  <CardTitle className="text-sm">
                    <UsersRound className="inline -translate-y-0.5 mr-2" />
                    Current Members
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-2xl">
                    {guild.members}
                    <div className="text-xs mt-2 text-red-400">
                      -5 than yesterday
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
        </>
    )
}