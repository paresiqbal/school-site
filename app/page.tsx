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
          <div className="w-screen bg-rose-50 py-8">
            <div className="mx-auto max-w-5xl">
              <div>
                <h2 className="mb-4 text-3xl font-bold">
                  SMK Negeri 1 Rejang Lebong
                </h2>
                <p className="text-muted-foreground">
                  Membangun generasi muda cerdas dan berakhlak.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex justify-between space-x-4">
                  <Link
                    href="/guide/registration"
                    className="hover:shadow-button rounded-md border-2 border-foreground px-6 py-2 transition"
                  >
                    Daftar
                  </Link>
                  <Link
                    href="/guide/registration"
                    className="hover:shadow-button rounded-md border-2 border-foreground bg-primary px-6 py-2 text-background transition"
                  >
                    Brosur PPDB
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center rounded-md border-2 border-foreground bg-primary p-4 text-background transition hover:shadow-card">
                    <p className="text-2xl font-bold">B</p>
                    <p className="text-sm">Akreditasi</p>
                  </div>
                  <div className="flex flex-col items-center rounded-md border-2 border-foreground bg-primary p-4 text-background transition hover:shadow-card">
                    <p className="text-2xl font-bold">200+</p>
                    <p className="text-sm">Siswa</p>
                  </div>
                  <div className="flex flex-col items-center rounded-md border-2 border-foreground bg-primary p-4 text-background transition hover:shadow-card">
                    <p className="text-2xl font-bold">7</p>
                    <p className="text-sm">Jurusan</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto my-6 flex max-w-5xl flex-col items-center justify-center gap-2">
              <section className="flex justify-between space-x-20">
                <p>Teknik Komputer & Jaringan</p>
                <p>Teknik Bisnis Sepeda Motor</p>
                <p>Teknik Kendaraan Ringan</p>
                <p>Teknik Elektronika</p>
              </section>
              <section className="flex justify-between space-x-11">
                <p>Teknik Desain Pemodelan</p>
                <p>Teknik Instalasi Tenaga Listrik</p>
                <p>Teknik Pengelasan</p>
                <p>Teknik Mesin</p>
              </section>
            </div>
          </div>
        </main>
        <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6"></footer>
      </div>
      <Footer />
    </>
  );
}
