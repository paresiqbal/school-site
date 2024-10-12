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
      <div className="w-full px-6 md:px-10 lg:px-40">{children}</div>
    </section>
  );
}
