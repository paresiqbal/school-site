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
      <div>
        <Sidebar />
      </div>
      <div className="w-full bg-muted/40 p-6">{children}</div>
      <div className="fixed bottom-4 right-4 z-50">
        <ModeToggle />
      </div>
    </section>
  );
}
