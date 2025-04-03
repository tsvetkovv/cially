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
      <SidebarHeader><img src="/logo-png.png" className="w-20 place-self-center"></img><hr></hr></SidebarHeader>
      <SidebarContent>
        <SidebarGroup></SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
