"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
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
import { BookOpen, BriefcaseIcon, Hammer, Users } from "lucide-react";

export default function ComputerScienceMajorPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            Teknik Komputer & Jaringan
          </h1>
          <p className="mb-6 text-lg text-muted-foreground md:text-xl">
            Selami dunia komputasi, internet dan jaringan.
          </p>

          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-xl"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="prose max-w-none">
            <p>
              Program Teknik Komputer & Jaringan (TKJ) adalah program studi yang
              mempelajari tentang teknologi komputer, jaringan, dan internet.
              Program ini dirancang untuk mempersiapkan siswa menjadi
              profesional di bidang teknologi informasi dan komunikasi.
            </p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Program Sorotan</CardTitle>
            <CardDescription>
              Program Teknik Komputer & Jaringan menawarkan:
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-4">
              <BookOpen className="h-4 w-4" />
              <div className="font-medium">Kurikulum Komprehensif</div>
            </div>
            <div className="flex items-center gap-4">
              <Users className="h-4 w-4" />
              <div className="font-medium">Proyek Kolaboratif</div>
            </div>
            <div className="flex items-center gap-4">
              <BriefcaseIcon className="h-4 w-4" />
              <div className="font-medium">Magang Industri</div>
            </div>
            <div className="flex items-center gap-4">
              <Hammer className="h-4 w-4" />
              <div className="font-medium">Peluang Kerja</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="mt-12">
        <TabsList>
          <TabsTrigger value="courses">Materi Utama</TabsTrigger>
          <TabsTrigger value="careers">Prospek Karir</TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Dasar-dasar Komputer",
              "Jaringan Komputer",
              "Administrasi Server",
              "Teknologi Jaringan Nirkabel",
              "Keamanan Jaringan",
              "Pengelolaan Jaringan",
              "Pemrograman Dasar",
              "Cloud Computing",
              "Internet of Things (IoT)",
            ].map((course) => (
              <Card key={course}>
                <CardHeader>
                  <CardTitle className="text-lg">{course}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="careers" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Teknisi Komputer",
              "Network Administrator",
              "IT Support",
              "Administrator Server",
              "Teknisi Jaringan Nirkabel",
              "Spesialis Keamanan Jaringan",
              "Administrator Cloud",
              "Teknisi IoT",
              "Web Developer atau Programmer",
            ].map((career) => (
              <Card key={career}>
                <CardHeader>
                  <CardTitle className="text-lg">{career}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <h2 className="mb-4 text-xl font-bold md:text-2xl">
          Siap untuk memulai karir Anda di dunia teknologi?
        </h2>
        <Button asChild size="lg">
          <Link href="/guide/registration">Daftar Sekarang</Link>
        </Button>
      </div>
    </div>
  );
}
