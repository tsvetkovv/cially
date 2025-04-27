"use client";

import { Calendar, ChartLine, Home, Inbox } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
	const searchParams = useSearchParams();

	const guildID = searchParams ? searchParams.get("guildID") : "error";

	// Menu items.
	const items = [
		{
			title: "General",
			url: `/dashboard?guildID=${guildID}`,
			icon: Home,
		},
		{
			title: "Messages & Activity",
			url: `/dashboard/messages?guildID=${guildID}`,
			icon: Inbox,
		} /* 
    {
      title: "Growth",
      url: `/dashboard/growth?guildID=${guildID}`,
      icon: ChartLine,
    }, */,
	];
	return (
		<Sidebar className="rounded-lg border border-white/0 bg-white/4 backdrop-blur-md">
			<SidebarHeader>
				<a href="/">
					<img src="/logo-png.png" className="w-20 place-self-center"></img>
				</a>
				<hr></hr>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroupLabel className="ml-1">Server Analytics</SidebarGroupLabel>
				<SidebarGroupContent className="ml-3 w-50">
					<SidebarMenu>
						{items.map((item) => (
							<SidebarMenuItem
								key={item.title}
								className="rounded-sm from-white/0 to-white/10 transition-all hover:bg-gradient-to-r"
							>
								<SidebarMenuButton asChild>
									<a href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}
