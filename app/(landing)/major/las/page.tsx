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

export default function Titl() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <div className="container mx-auto mb-8 flex max-w-[1200px] flex-col px-4 pt-6 md:px-6 md:pt-12 lg:px-0">
      <div>
        <h1 className="mb-2 text-2xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
          Teknik Pengelasan
        </h1>
        <p className="mb-6 text-base text-muted-foreground md:text-lg lg:text-xl">
          Pelajari teknik pengelasan dan siapkan diri Anda untuk menjadi ahli.
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
              Teknik Pengelasan adalah salah satu program yang menawarkan
              pengetahuan dan keterampilan dalam proses pengelasan logam.
            </p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl lg:text-2xl">
              Program Sorotan
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Program Teknik Pengelasan menawarkan:
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
              "Dasar-Dasar Pengelasan",
              "Teknik Pengelasan",
              "Penggunaan Alat dan Mesin Las",
              "Membaca Gambar Teknik",
              "Pengetahuan Material",
              "Kontrol Kualitas",
              "Pemeliharaan dan Perbaikan",
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
          Siap untuk Memulai? Daftar Sekarang!
        </h2>
        <Button asChild size="lg">
          <Link href="/guide/registration">Daftar Sekarang</Link>
        </Button>
      </div>
    </div>
  );
}
