"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex bg-background">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="-ml-1" />
        <div className="w-full bg-muted/40 p-6">{children}</div>
      </SidebarProvider>
      <div className="fixed bottom-4 right-4 z-50">
        <ModeToggle />
      </div>
    </section>
  );
}
