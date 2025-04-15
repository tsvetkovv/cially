import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../_components/_shadcn/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger className="sm:hidden"/>
        {children}
        <div className="text-center mt-5 text-xs text-gray-600 pb-5">
          Thanks for using Cially Dashboard!
        </div>
      </main>
    </SidebarProvider>
  )
}
