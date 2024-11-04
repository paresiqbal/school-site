"use client";

import * as React from "react";
import Link from "next/link";

// ex lib
import Autoplay from "embla-carousel-autoplay";

// ui lib
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// icons
import { BookOpen, BriefcaseIcon, Hammer, Users } from "lucide-react";

export default function DesainPemodelan() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <div className="container mx-auto mb-8 flex max-w-[1200px] flex-col px-4 pt-6 md:px-6 md:pt-12 lg:px-0">
      <div>
        <h1 className="mb-2 text-2xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
          Desain Pemodelan
        </h1>
        <p className="mb-6 text-base text-muted-foreground md:text-lg lg:text-xl">
          Pelajari teknik desain pemodelan dan siapkan diri Anda untuk menjadi
          arsitek.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="aspect-[4/3] w-full">
                      {/* Set a 4:3 aspect ratio */}
                      <CardContent className="flex h-full items-center justify-center p-4 md:p-6">
                        <span className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="prose mt-4 max-w-none text-sm md:text-base lg:text-lg">
            <p>
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
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl lg:text-2xl">
              Program Sorotan
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Program Teknik Desain Pemodelan menawarkan:
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
              <div className="text-sm font-medium md:text-base">
                Kurikulum Komprehensif
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <Users className="h-5 w-5 md:h-6 md:w-6" />
              <div className="text-sm font-medium md:text-base">
                Proyek Kolaboratif
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <BriefcaseIcon className="h-5 w-5 md:h-6 md:w-6" />
              <div className="text-sm font-medium md:text-base">
                Magang Industri
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <Hammer className="h-5 w-5 md:h-6 md:w-6" />
              <div className="text-sm font-medium md:text-base">
                Peluang Kerja
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="mt-8 md:mt-12">
        <TabsList>
          <TabsTrigger value="courses">Materi Utama</TabsTrigger>
          <TabsTrigger value="careers">Prospek Karir</TabsTrigger>
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
              "Pemahaman Struktur dan Konstruksi:",
              "Analisis dan Simulasi",
              "Teknik Presentasi Desain",
              "Praktik Kerja Lapangan (PKL)",
            ].map((course) => (
              <Card key={course}>
                <CardHeader>
                  <CardTitle className="text-sm md:text-lg">{course}</CardTitle>
                </CardHeader>
              </Card>
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
              <Card key={career}>
                <CardHeader>
                  <CardTitle className="text-sm md:text-lg">{career}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center md:mt-12">
        <h2 className="mb-4 text-lg font-bold md:text-xl lg:text-2xl">
          Siap untuk memulai karir Anda di bidang desain pemodelan?
        </h2>
        <Button asChild size="lg">
          <Link href="/guide/registration">Daftar Sekarang</Link>
        </Button>
      </div>
    </div>
  );
}
