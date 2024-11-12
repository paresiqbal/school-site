"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

// ex lib
import Autoplay from "embla-carousel-autoplay";

// ui lib
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// icons
import { BookOpen, BriefcaseIcon, Hammer, Users } from "lucide-react";

export default function Tkj() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  const images = [
    "/assets/major/tkj/tkj1.jpg",
    "/assets/major/tkj/tkj2.jpg",
    "/assets/major/tkj/tkj3.jpg",
    "/assets/major/tkj/tkj4.jpg",
    "/assets/major/tkj/tkj5.jpg",
  ];

  return (
    <div className="mx-auto mt-4 flex max-w-[1200px] flex-col pt-6 font-[family-name:var(--font-geist-sans)] md:pt-12">
      <div className="space-y-2 pb-8">
        <h1 className="mb-2 text-balance text-4xl font-bold md:mb-6 md:text-5xl">
          Desain Pemodelan
        </h1>
        <p className="text-md mb-12 text-muted-foreground md:text-lg">
          Pelajari teknik desain pemodelan dan siapkan diri Anda untuk menjadi
          arsitek.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Carousel
            plugins={[
              plugin.current,
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full transition hover:shadow-card"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-[4/3] w-full rounded-md border-4 border-foreground">
                    <Image
                      src={src}
                      alt={`TKJ Image ${index + 1}`}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="my-8 max-w-none text-sm md:text-base lg:text-lg">
            <p className="text-lg">
              <span className="text-primary">
                {" "}
                Teknik Desain Pemodelan(DPIB)
              </span>{" "}
              Teknik desain pemodelan adalah salah satu program studi yang
              menawarkan kurikulum komprehensif, proyek kolaboratif, magang
              industri, dan peluang kerja. Program ini menawarkan materi utama
              seperti dasar-dasar desain, pemodelan 3D, desain interior, desain
              eksterior, desain produk, desain grafis, desain web, dan desain
              game. Lulusan program ini memiliki prospek karir sebagai arsitek,
              desainer interior, dan desainer produk.
            </p>
          </div>
        </div>

        <div className="max-h-[530px] rounded-md border-2 border-foreground bg-emerald-300/90 p-4 transition hover:bg-emerald-400 hover:shadow-card dark:text-background">
          <h3 className="mb-2 text-2xl font-bold">Program Sorotan</h3>
          <p className="mb-4 text-base font-medium">
            Program Teknik Desain Pemodelan menawarkan:
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6" />
              <span className="text-base font-semibold">
                Kurikulum Komprehensif
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6" />
              <span className="text-base font-semibold">
                Proyek Kolaboratif
              </span>
            </div>
            <div className="flex items-center gap-3">
              <BriefcaseIcon className="h-6 w-6" />
              <span className="text-base font-semibold">Magang Industri</span>
            </div>
            <div className="flex items-center gap-3">
              <Hammer className="h-6 w-6" />
              <span className="text-base font-semibold">Peluang Kerja</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="courses" className="mt-8 md:mt-12">
        <TabsList className="border-4 border-foreground">
          <TabsTrigger value="courses" className="font-bold">
            Materi Utama
          </TabsTrigger>
          <TabsTrigger value="careers" className="font-bold">
            Prospek Karir
          </TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="mt-4 md:mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Penggambaran Teknik",
              "Desain Berbantuan Komputer",
              "Pemodelan 3D",
              "Teknik Pemodelan dan Rendering",
              "Gambar Mesin dan Komponen Teknik",
              "Desain Produk",
              "Teknologi Material",
              "Proses Manufaktur dan Produksi",
              "Pemahaman Struktur dan Konstruksi",
              "Analisis dan Simulasi",
              "Teknik Presentasi Desain",
              "Praktik Kerja Lapangan (PKL)",
            ].map((course) => (
              <div
                key={course}
                className="transform rounded-md border-2 border-foreground bg-emerald-300/90 p-4 text-sm font-semibold shadow-card transition-all duration-150 ease-in-out hover:translate-y-1 hover:bg-emerald-400 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:text-background dark:active:shadow-[2px_2px_0px_rgba(255,255,255,1)] md:text-lg"
              >
                {course}
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="careers" className="mt-4 md:mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Desainer Produk",
              "Desainer CAD",
              "Drafter Teknik",
              "Teknisi Pemodelan 3D",
              "Desainer Arsitektur dan Interior",
              "Pengembang Prototipe",
              "Operator CNC",
              "Inspektor atau Quality Control",
              "Desainer Industri",
              "Pengajar atau Instruktur Desain",
              "Desainer Proyek Infrastruktur",
              "Desainer Visualisasi untuk Real Estate",
            ].map((career) => (
              <div
                key={career}
                className="transform rounded-md border-2 border-foreground bg-emerald-300/90 p-4 text-sm font-semibold shadow-card transition-all duration-150 ease-in-out hover:translate-y-1 hover:bg-emerald-400 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:text-background dark:active:shadow-[2px_2px_0px_rgba(255,255,255,1)] md:text-lg"
              >
                {career}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mb-8 mt-8 text-center md:mt-12">
        <h2 className="mb-4 text-lg font-bold md:text-xl lg:text-2xl">
          Siap untuk memulai karir Anda di bidang desain pemodelan?
        </h2>
        <Button
          asChild
          size="lg"
          className="hover:shadow-button border-2 border-foreground transition"
        >
          <Link href="/guide/registration">Daftar Sekarang</Link>
        </Button>
      </div>
    </div>
  );
}
