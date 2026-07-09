"use client"

import * as React from "react"
import { SquareTerminal } from "lucide-react"

import { NavMain } from "@/src/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/src/components/ui/sidebar"

const NAV_DATA = {
  ADMIN: [
    {
      title: "Admin Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "View All Tutors", url: "/dashboard/all-tutor" },
        { title: "View All Students", url: "/dashboard/all-student" },
        { title: "View All Bookings", url: "/dashboard/all-booking" },
        { title: "Create Category", url: "/dashboard/create-category" },
        { title: "View All Category", url: "/dashboard/view-category" },
      ],
    },
  ],
  TUTOR: [
    {
      title: "Tutor Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Create Profile", url: "/dashboard/create-profile" },
        { title: "Edit Profile", url: "/dashboard/edit-profile" },
        { title: "Create Availability", url: "/dashboard/create-availability" },
        { title: "Edit Availability", url: "/dashboard/edit-availability" },
        { title: "View Bookings", url: "/dashboard/view-bookings" },
        { title: "View Reviews", url: "/dashboard/review" },
      ],
    },
  ],
  STUDENT: [
    {
      title: "Student Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "View All Bookings", url: "/dashboard/my-booking" },
        { title: "Reviews", url: "/dashboard/reviews" },
      ],
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: "ADMIN" | "TUTOR" | "STUDENT"
}

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItem = NAV_DATA[userRole] || NAV_DATA.STUDENT;

  if (!isMounted) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>

      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItem} />
      </SidebarContent>

      <SidebarFooter>

      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}