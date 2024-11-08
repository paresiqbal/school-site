import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CarouselPlugin } from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SMK Negeri 1 Rejang Lebong",
  description: "Create with Next.js",
  authors: [{ name: "Pahreza Iqbal Prastowo", url: "paresiqbal.me" }],
};

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen items-center justify-items-center px-6 font-[family-name:var(--font-geist-sans)] md:px-10 lg:px-64">
        <CarouselPlugin />
        <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
          <div className="w-screen bg-rose-50 py-8">
            <div className="mx-auto max-w-5xl px-4">
              <div>
                <h2 className="mb-4 text-2xl font-bold">
                  SMK Negeri 1 Rejang Lebong
                </h2>
                <p className="text-muted-foreground">
                  Membangun generasi muda cerdas dan berakhlak.
                </p>
              </div>
              <div>
                <div>
                  <Link href="/guide/registration" className="px-6 py-2">
                    Daftar
                  </Link>
                  <Button className="px-6 py-2">Brosur PPDB</Button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
                    <p className="text-3xl font-bold text-gray-800">A</p>
                    <p className="text-sm text-gray-500">Akreditasi</p>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
                    <p className="text-3xl font-bold text-gray-800">1000+</p>
                    <p className="text-sm text-gray-500">Jumlah siswa</p>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
                    <p className="text-3xl font-bold text-gray-800">7</p>
                    <p className="text-sm text-gray-500">Jurusan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6"></footer>
      </div>
      <Footer />
    </>
  );
}
