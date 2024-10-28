"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboardIcon, House } from "lucide-react";
import Link from "next/link";

export function NavDashboard() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip={"Halaman Utama"}>
            <House className="h-6 w-6" />
            <Link href={"/dashboard"}>Halaman Utama</Link>
          </SidebarMenuButton>
          <SidebarMenuButton tooltip={"Dashboard"}>
            <LayoutDashboardIcon className="h-6 w-6" />
            <Link href={"/dashboard"}>Dashboard</Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
