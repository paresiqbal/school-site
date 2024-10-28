"use client";

import { CalendarPlus, Volume2, Hexagon, Newspaper } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Berita",
      url: "#",
      icon: Newspaper,
      isActive: true,
      items: [
        {
          title: "Daftar Berita",
          url: "/dashboard/news",
        },
        {
          title: "Buat Berita",
          url: "/dashboard/news/createNews",
        },
      ],
    },
    {
      title: "Pengumuman",
      url: "#",
      icon: Volume2,
      items: [
        {
          title: "Daftar Pengumuman",
          url: "/dashboard/announcement",
        },
        {
          title: "Buat Pengumuman",
          url: "/dashboard/announcement/createAnnouncement",
        },
      ],
    },
    {
      title: "Agenda",
      url: "#",
      icon: CalendarPlus,
      items: [
        {
          title: "Daftar Agenda",
          url: "/dashboard/agenda",
        },
        {
          title: "Buat Agenda",
          url: "/dashboard/agenda/createAgenda",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} variant="sidebar">
      <SidebarHeader>
        <div>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
              <Hexagon size={20} />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <p>SMKN 1 RL</p>
            </div>
          </SidebarMenuButton>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
