import type { Metadata } from "next";

// componentss
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CarouselPlugin } from "@/components/Carousel";
import InfoPlugin from "@/components/Info";
import PrestasiPlugin from "@/components/Prestasi";
import NewsPlugin from "@/components/News";
import SambutanPlugin from "@/components/Sambutan";
import KepsekPlugin from "@/components/Kepsek";
import GalleryPlugin from "@/components/GalleryPlugin";

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
        <main className="row-start-2 flex w-full flex-col items-center justify-center sm:items-start">
          <h1>Test doang</h1>
          <SambutanPlugin />
          <KepsekPlugin />
          <InfoPlugin />
          <PrestasiPlugin />
          <NewsPlugin />
          <GalleryPlugin />
        </main>
        <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6"></footer>
      </div>
      <Footer />
    </>
  );
}
