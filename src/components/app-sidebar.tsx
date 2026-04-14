"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/src/components/nav-main"
import { NavProjects } from "@/src/components/nav-projects"
import { NavUser } from "@/src/components/nav-user"
import { TeamSwitcher } from "@/src/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/src/components/ui/sidebar"

// This is sample data.

const ADMIN_navMain = [
  {
    title: "Admin Dashboard",
    url: "/dashboard",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "View All Tutors",
        url: "/dashboard/all-tutor",
      },
      {
        title: "View All Students",
        url: "/dashboard/all-student",
      },
      {
        title: "View All Bookings",
        url: "/dashboard/all-booking",
      },
      {
        title: "Create Category",
        url: "/dashboard/create-category",
      },
      {
        title: "View All Category",
        url: "/dashboard/view-category",
      },
    ],
  },
];

const TUTOR_navMain = [
  {
    title: "Tutor Dashboard",
    url: "/dashboard",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Create Session",
        url: "/dashboard/create-session",
      },
      {
        title: "Edit Session",
        url: "/dashboard/session",
      },
      // {
      //   title: "Settings",
      //   url: "#",
      // },
    ],
  },
];

const STUDENT_navMain = [
  {
    title: "Student Dashboard",
    url: "/dashboard",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "View All Bookings",
        url: "/dashboard/my-booking",
      },
      {
        title: "Reviews",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: "ADMIN" | "TUTOR" | "STUDENT"
}



// export function AppSidebar({userRole, ...props }: React.ComponentProps<typeof Sidebar>) {
export function AppSidebar({ userRole, ...props }: AppSidebarProps) {

  let navItem = null;
  if (userRole === "ADMIN") {
    navItem = ADMIN_navMain;
  } else if (userRole === "TUTOR") {
    navItem = TUTOR_navMain;
  } else {
    navItem = STUDENT_navMain;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItem} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
