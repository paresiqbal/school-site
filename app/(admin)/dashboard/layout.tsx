"use client";

import { ModeToggle } from "@/components/ModeToggle";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex bg-background">
      <Sidebar />
      <div className="p-6 w-full bg-muted/40">{children}</div>
      <div className="fixed bottom-4 right-4 z-50">
        <ModeToggle />
      </div>
    </section>
  );
}
