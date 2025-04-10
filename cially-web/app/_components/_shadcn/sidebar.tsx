import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

  
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader><a href='/'><img src="/logo-png.png" className="w-20 place-self-center"></img></a><hr></hr></SidebarHeader>
      <SidebarContent>
        <SidebarGroup></SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
