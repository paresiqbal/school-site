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
import Link from "next/link";
import { useSession } from "next-auth/react";

const data = {
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
  const { data: session } = useSession();

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
              <Link href={"/"}>SMKN 1 RL</Link>
            </div>
          </SidebarMenuButton>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: session?.user?.name || "User",
            email: session?.user?.email || "admin@smk1rl.com",
            avatar: session?.user?.image || "images/avatar.jpg",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
