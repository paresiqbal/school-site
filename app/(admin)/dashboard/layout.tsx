"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { SidebarProvider } from "@/components/ui/sidebar";

import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex bg-background">
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full bg-muted/40 p-4">
          <TooltipProvider>{children} </TooltipProvider>
        </div>
      </SidebarProvider>
      <div className="fixed bottom-4 right-4 z-50">
        <ModeToggle />
      </div>
    </section>
  );
}
