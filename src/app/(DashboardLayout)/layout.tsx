import { AppSidebar } from "@/src/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import { Separator } from "@/src/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/src/components/ui/sidebar"
import { redirect } from "next/navigation";
import { getUser } from "@/src/lib/auth/getUser";

const DASHBOARD_ROLES = ["ADMIN", "STUDENT", "TUTOR"] as const;

export default async function DashboardLayout({ admin, student, tutor }: { admin: React.ReactNode, student: React.ReactNode, tutor: React.ReactNode }) {
  const user = await getUser();

  if (!user?.role || !DASHBOARD_ROLES.includes(user.role)) {
    redirect("/login?redirect=/dashboard");
  }

  const userRole = user.role;

  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>      
                  <BreadcrumbPage>Data Fetching HOchhe</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
            {userRole === "ADMIN" && admin}
            {userRole === "STUDENT" && student}
            {userRole === "TUTOR" && tutor}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
