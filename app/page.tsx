import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CarouselPlugin } from "@/components/Carousel";

export const metadata: Metadata = {
  title: "SMK Negeri 1 Rejang Lebong",
  description: "Create with Next.js",
  authors: [{ name: "Pahreza Iqbal Prastowo", url: "paresiqbal.me" }],
};

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
        <CarouselPlugin />
        <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start"></main>
        <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6"></footer>
      </div>
      <Footer />
    </>
  );
}
