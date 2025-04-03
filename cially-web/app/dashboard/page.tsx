"use server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UsersRound, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function Dashboard() {
  return (
    <>
      <div className="grid grid-rows-3 ml-10 mt-10 min-w-dvh mr-4">
        <div>
          <div className="grid grid-cols-8 rows-span-1">
            <div className="col-span-2 text-4xl ">
              Good Evening!
              <div className="text-gray-400 text-xs font-normal mt-2">
                Currently viewing Guild Name
              </div>
            </div>
            <div className="col-start-4 col-span-2 mr-4">
              <Card className="">
                <CardHeader>
                  <CardTitle className="text-sm">
                    <UsersRound className="inline -translate-y-0.5 mr-2" />
                    Current Members
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-2xl">
                    999
                    <div className="text-xs mt-2 text-red-400">
                      -5 than yesterday
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            <div className="col-start-6 col-span-2 mr-4">
              <Card className="">
                <CardHeader>
                  <CardTitle className="text-sm">
                    <MessageCircle className="inline -translate-y-0.5 mr-2" />
                    Messages Today
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-2xl">
                    21838
                    <div className="text-xs mt-2 text-green-400">
                      +20% than yesterday
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
        <div className="row-span-3">
          <Card className="grid grid-cols-5 mt-10 px-10 min-w-dvh">
            <div className="col-span-1 col-start-1 w-20 h-20">
              <Avatar className=" w-20 h-20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>Guild</AvatarFallback>
              </Avatar>
            </div>

            <div className="col-span-2 grid grid-rows-2">
              <div>
                <div className="text-2xl">Guild Name</div>
                <div className="text-gray-400 text-xs">
                  This is the Guild Description
                </div>
              </div>
              <div className="">
                Members: 999<br></br>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>Available: Yes</TooltipTrigger>
                    <TooltipContent>
                      <p>
                        If a server is not available, it means it’s down or in
                        an outage
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <br></br>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>Partnered: No</TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Shows if the server belongs to the Discord Partner
                        Program
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <br></br>
                Created: Tue, 8 March 2025
              </div>
            </div>

            <div className="col-span-2 grid grid-rows-2">
              <div>
                <div className="text-2xl"></div>
                <div className="text-gray-400 text-xs">
                </div>
              </div>
              <div className="">
                Channels: 17<br></br>
                Roles: 19
                <br></br>
                Bans: 42<br></br>
                Owner: skellgreco
              </div>
            </div>
          </Card>
        </div>
        <div className="text-center mt-10 text-xs text-gray-600">
            Thanks for using Cially Dashboard!
        </div>
      </div>
    </>
  );
}
