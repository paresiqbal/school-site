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
          Teknik Pengelasan
        </h1>
        <p className="text-md mb-12 text-muted-foreground md:text-lg">
          Pelajari teknik pengelasan dan siapkan diri Anda untuk menjadi ahli.
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
              <span className="text-primary">Teknik Pengelasan (LAS)</span>{" "}
              adalah salah satu program yang menawarkan pengetahuan dan
              keterampilan dalam proses pengelasan logam.
            </p>
          </div>
        </div>

        <div className="max-h-[530px] rounded-md border-2 border-foreground bg-emerald-300/90 p-4 transition hover:bg-emerald-400 hover:shadow-card dark:text-background">
          <h3 className="mb-2 text-2xl font-bold">Program Sorotan</h3>
          <p className="mb-4 text-base font-medium">
            Program Teknik Pengelasan menawarkan:
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
              "Dasar-Dasar Pengelasan",
              "Teknik Pengelasan",
              "Penggunaan Alat dan Mesin Las",
              "Membaca Gambar Teknik",
              "Pengetahuan Material",
              "Kontrol Kualitas",
              "Pemeliharaan dan Perbaikan",
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
              "Industri Manufaktur",
              "Konstruksi",
              "Industri Minyak dan Gas",
              "Industri Kapal dan Perkapalan",
              "Industri Otomotif dan Perbaikan Kendaraan",
              "Pengelasan di Perusahaan Militer dan Dirgantara",
              "Teknik Las di Sektor Energi Terbarukan",
              "Pengusaha Bengkel Las",
              "Juru Inspeksi Las",
              "Instruktur atau Guru Pengelasan",
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
          Siap untuk Memulai? Daftar Sekarang!
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
