import { Calendar, Home, Inbox, Search, MessageSquare, ChartLine } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "General",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Messages",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Growth",
    url: "#",
    icon: ChartLine,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader><a href='/'><img src="/logo-png.png" className="w-20 place-self-center"></img></a><hr></hr></SidebarHeader>
      <SidebarContent>
        <SidebarGroupLabel className="ml-1">Server Analytics</SidebarGroupLabel>
        <SidebarGroupContent className="ml-3 w-50">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
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
