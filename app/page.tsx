import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CarouselPlugin } from "@/components/Carousel";
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
      <div className="min-h-screen items-center justify-items-center px-6 font-[family-name:var(--font-geist-sans)]">
        <CarouselPlugin />
        <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
          <div className="w-screen bg-rose-50 py-8 dark:bg-accent">
            <div className="mx-auto max-w-5xl px-4">
              <div className="mb-8 text-center md:text-left">
                <h2 className="mb-2 text-2xl font-bold md:text-3xl">
                  SMK Negeri 1 Rejang Lebong
                </h2>
                <p>Membangun generasi muda cerdas dan berakhlak.</p>
              </div>
              <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                <div className="flex justify-center space-x-4 md:justify-start">
                  <Link
                    href="/guide/registration"
                    className="hover:shadow-button rounded-md border-2 border-foreground px-6 py-2 transition"
                  >
                    Daftar
                  </Link>
                  <Link
                    href="/guide/registration"
                    className="hover:shadow-button rounded-md border-2 border-foreground bg-primary px-6 py-2 text-white transition"
                  >
                    Brosur PPDB
                  </Link>
                </div>

                <div className="grid w-full grid-cols-3 gap-4 text-center md:w-auto">
                  <div className="flex flex-col items-center rounded-md border-4 border-foreground bg-primary p-4 text-white transition hover:shadow-card md:p-6">
                    <p className="text-2xl font-bold md:text-3xl">B</p>
                    <p className="text-sm md:text-base">Akreditasi</p>
                  </div>
                  <div className="flex flex-col items-center rounded-md border-4 border-foreground bg-primary p-4 text-white transition hover:shadow-card md:p-6">
                    <p className="text-2xl font-bold md:text-3xl">200+</p>
                    <p className="text-sm md:text-base">Siswa</p>
                  </div>
                  <div className="flex flex-col items-center rounded-md border-4 border-foreground bg-primary p-4 text-white transition hover:shadow-card md:p-6">
                    <p className="text-2xl font-bold md:text-3xl">7</p>
                    <p className="text-sm md:text-base">Jurusan</p>
                  </div>
                </div>
              </div>

              <div className="mx-auto my-6 flex max-w-5xl flex-col items-center justify-center gap-4 px-2 md:px-0">
                <section className="grid grid-cols-2 gap-y-4 space-x-2 text-center md:flex md:justify-between md:space-x-20 md:text-left">
                  <p className="text-sm md:text-base">
                    Teknik Komputer & Jaringan
                  </p>
                  <p className="text-sm md:text-base">
                    Teknik Bisnis Sepeda Motor
                  </p>
                  <p className="text-sm md:text-base">
                    Teknik Kendaraan Ringan
                  </p>
                  <p className="text-sm md:text-base">Teknik Elektronika</p>
                </section>
                <section className="grid grid-cols-2 gap-y-4 text-center md:flex md:justify-between md:space-x-11 md:text-left">
                  <p className="text-sm md:text-base">
                    Teknik Desain Pemodelan
                  </p>
                  <p className="text-sm md:text-base">
                    Teknik Instalasi Tenaga Listrik
                  </p>
                  <p className="text-sm md:text-base">Teknik Pengelasan</p>
                  <p className="text-sm md:text-base">Teknik Mesin</p>
                </section>
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
