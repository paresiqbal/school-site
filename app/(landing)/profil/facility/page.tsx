"use client";

import Image from "next/image";
import { useState } from "react";

// ui lib
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// icons
import {
  School,
  Book,
  Computer,
  LoaderPinwheel,
  CircleParking,
  Cross,
} from "lucide-react";

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
      icon: Computer,
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
      icon: LoaderPinwheel,
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
      icon: CircleParking,
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
      icon: Cross,
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
    <div className="mx-auto mt-4 flex max-w-[1200px] flex-col pt-6 md:items-center md:justify-center md:pt-12">
      <div className="space-y-2 pb-8 text-center">
        <h1 className="mb-2 text-balance text-4xl font-bold dark:text-gray-300 md:mb-6 md:text-5xl">
          Fasilitas Sekolah
        </h1>
        <p className="text-md mb-12 text-muted-foreground md:text-lg">
          Temukan berbagai ruang dan sumber daya yang dirancang untuk
          meningkatkan pembelajaran dan kesejahteraan siswa.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility, index) => (
          <div
            key={index}
            className="relative rounded-md border-4 border-black hover:shadow-card dark:border-white dark:hover:shadow-card"
          >
            <div className="flex flex-col">
              <Image
                src={facility.images[0]}
                alt={`Image of ${facility.name}`}
                width={400}
                height={250}
                className="h-auto w-full cursor-pointer rounded-t-md border-b-4 border-black hover:opacity-80"
                onClick={() => setSelectedImages(facility.images)}
              />
              <div className="h-2 w-full bg-primary"></div>
              <div className="p-4">
                <div className="flex items-center space-x-4 pb-2">
                  <facility.icon
                    className="h-8 w-8 rounded-full bg-foreground p-1 text-background"
                    aria-label={facility.name}
                  />
                  <h3 className="text-2xl font-bold text-black dark:text-white">
                    {facility.name}
                  </h3>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {facility.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImages && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setSelectedImages(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-lg"
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
