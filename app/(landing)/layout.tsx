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
      <div className="w-full px-44">{children}</div>
    </section>
  );
}
