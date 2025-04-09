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

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const guildID = (await searchParams).guildID

 
  //TODO change to dynamic fetch
  let API_REQ = await fetch(`http://localhost:3000/api/server/${guildID}/fetchGuild`)
  let data = await API_REQ.json()
  let guild = data.guildFound[0]
  return (
    <>
      <div className="grid grid-rows-3 ml-10 mt-10 min-w-dvh mr-4">
        <div>
          <div className="grid grid-cols-8 rows-span-1">
            <div className="col-span-2 text-4xl ">
              Good Evening!
              <div className="text-gray-400 text-xs font-normal mt-2">
                Currently viewing { guild.name }
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
                    {guild.members}
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
                <div className="text-2xl">{guild.name}</div>
                <div className="text-gray-400 text-xs">
                  This is the Guild Description
                </div>
              </div>
              <div className="">
                Members: {guild.members}<br></br>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>Available: {guild.available}</TooltipTrigger>
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
                    <TooltipTrigger>Partnered: {guild.discord_partner}</TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Shows if the server belongs to the Discord Partner
                        Program
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <br></br>
                Created: {guild.creation_date}
              </div>
            </div>

            <div className="col-span-2 grid grid-rows-2">
              <div>
                <div className="text-2xl"></div>
                <div className="text-gray-400 text-xs">
                </div>
              </div>
              <div className="">
                Channels: {guild.channels}<br></br>
                Roles: {guild.roles}
                <br></br>
                Bans: {guild.bans}<br></br>
                Owner: {guild.owner_username}
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
