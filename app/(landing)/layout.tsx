"use client";

import Navbar from "@/components/Navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-background">
      <div>
        <Navbar />
      </div>
      <div className="w-full bg-muted/40 p-6">{children}</div>
    </section>
  );
}
