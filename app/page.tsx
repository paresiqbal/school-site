import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CarouselPlugin } from "@/components/Carousel";
import { Button } from "@/components/ui/button";

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
        <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
          <div className="w-screen bg-amber-50 py-8">
            <div className="mx-auto max-w-5xl px-4">
              <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
                SMK Negeri 1 Rejang Lebong
              </h2>

              <div className="flex flex-col items-center justify-around gap-8 md:flex-row">
                {/* Left Section */}
                <div className="text-center md:text-left">
                  <p className="mb-4 text-lg text-gray-600">
                    Lorem ipsum, dolor sit amet consectetur adipisicing.
                  </p>
                  <div className="flex flex-col gap-4 md:flex-row">
                    <Button className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
                      Berkas PPDB
                    </Button>
                    <Button className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700">
                      Brosur PPDB
                    </Button>
                  </div>
                </div>

                {/* Right Section */}
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
