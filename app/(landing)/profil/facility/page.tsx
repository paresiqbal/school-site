"use client";

import Image from "next/image";
import { useState } from "react";

// ui lib
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// icons
import { School, Book, FlaskConical } from "lucide-react";

export default function Facility() {
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);

  const facilities = [
    {
      id: 1,
      name: "Kelas",
      icon: School,
      images: [
        "/assets/facility/classroom1.jpg",
        "/assets/facility/classroom2.jpg",
        "/assets/facility/classroom3.jpg",
      ],
      description:
        "Siswa dapat mengikuti pelajaran harian dan terlibat dalam kegiatan pembelajaran di kelas.",
    },
    {
      id: 2,
      name: "Perpustakaan",
      icon: Book,
      images: [
        "/assets/facility/library1.jpg",
        "/assets/facility/library2.jpg",
        "/assets/facility/library3.jpg",
      ],
      description:
        "Membaca buku, belajar, dan melakukan penelitian di perpustakaan.",
    },
    {
      id: 3,
      name: "Laboratorium Komputer",
      icon: FlaskConical,
      images: [
        "/assets/facility/classroom1.jpg",
        "/assets/facility/classroom2.jpg",
        "/assets/facility/classroom3.jpg",
      ],
      description: "Pembelajaran teknologi komputer dan informasi.",
    },
    {
      id: 4,
      name: "Lapangan Basket",
      icon: FlaskConical,
      images: [
        "/assets/facility/basketcourt1.jpg",
        "/assets/facility/basketcourt2.jpg",
        "/assets/facility/basketcourt3.jpg",
      ],
      description: "Lapangan basket.",
    },
    {
      id: 5,
      name: "Area Parkir",
      icon: FlaskConical,
      images: [
        "/assets/facility/parkir1.jpg",
        "/assets/facility/parkir2.jpg",
        "/assets/facility/parkir3.jpg",
      ],
      description: "Tempat parkir siswa, guru, dan juga tamu.",
    },
    {
      id: 6,
      name: "Unit Kesehatan Sekolah",
      icon: FlaskConical,
      images: [
        "/assets/facility/medical1.jpg",
        "/assets/facility/medical2.jpg",
        "/assets/facility/medical3.jpg",
      ],
      description:
        "Ruangan yang disediakan di sekolah untuk mengelola dan menangani masalah kesehatan siswa..",
    },
  ];

  return (
    <div className="container mx-auto mb-8 mt-4 flex max-w-[1200px] flex-col pt-6 md:pt-12">
      <div className="space-y-2 pb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold md:mb-6 md:text-5xl">
          Fasilitas Sekolah
        </h1>
        <p className="mb-12 text-sm text-muted-foreground md:text-lg">
          Temukan berbagai ruang dan sumber daya yang dirancang untuk
          meningkatkan pembelajaran dan kesejahteraan siswa.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility, index) => (
          <Card key={index} className="border-2 bg-card hover:border-primary">
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <facility.icon
                className="h-10 w-10 rounded-full bg-foreground p-2 text-background"
                aria-label={facility.name}
              />
              <CardTitle>{facility.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {facility.description}.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col pt-2">
              <Image
                src={facility.images[0]}
                alt={`Image of ${facility.name}`}
                width={200}
                height={100}
                className="h-auto w-full cursor-pointer rounded-md md:p-2"
                onClick={() => setSelectedImages(facility.images)}
              />
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedImages && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setSelectedImages(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-lg bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {selectedImages.map((image, idx) => (
                  <CarouselItem key={idx}>
                    <Card className="p-2">
                      <CardContent className="flex items-center justify-center p-2">
                        <Image
                          src={image}
                          alt={`Facility image ${idx + 1}`}
                          width={700}
                          height={500}
                          className="h-auto w-full rounded-md"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
}
