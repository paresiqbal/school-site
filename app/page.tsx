import type { Metadata } from "next";

// componentss
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// section ui
import { CarouselSection } from "@/components/Carousel";
import HighlightSection from "@/components/HighlightSection";
import KepsekSection from "@/components/KepsekSection";
import InfoSection from "@/components/InfoSection";
import AchievementSection from "@/components/AchievementSection";
import NewsSection from "@/components/NewsSection";
import GallerySection from "@/components/GallerySection";

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
        <CarouselSection />
        <main className="row-start-2 flex w-full flex-col items-center justify-center sm:items-start">
          <HighlightSection />
          <KepsekSection />
          <InfoSection />
          <AchievementSection />
          <NewsSection />
          <GallerySection />
        </main>
        <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6"></footer>
      </div>
      <Footer />
    </>
  );
}
