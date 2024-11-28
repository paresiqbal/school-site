"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// UI components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CircleChevronRightIcon } from "lucide-react";

// Utility functions
import {
  graphingText,
  formatDate,
  stripHtmlTags,
  extractImageUrl,
} from "@/utils/textUtils";

interface AchievementData {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  created_at: string;
}

export default function AchievementSection() {
  const [achievement, setAchievement] = useState<AchievementData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAchievement() {
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ACHIEVEMENT}`, {
          cache: "force-cache",
          next: {
            revalidate: 30,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch achievement.");
        }

        const data = await res.json();
        setAchievement(data);
      } catch (error) {
        console.error(error);
        setError("Gagal mengambil prestasi. Coba lagi nanti.");
      }
    }

    fetchAchievement();
  }, []);

  if (error)
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center py-2">
        <Image
          src="/assets/500error.svg"
          width={200}
          height={200}
          alt="Error"
          className="mb-4 opacity-90"
        />
        <p className="text-center text-lg font-bold text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="mx-auto w-full justify-center bg-rose-50 px-4 py-8 dark:bg-accent">
      <h2 className="mb-4 text-center text-sm font-medium text-muted-foreground">
        PRESTASI SISWA
      </h2>
      <div className="mx-auto my-4 flex max-w-6xl justify-between">
        <p className="text-lg font-semibold">Prestasi siswa</p>
        <Link
          href="/article/prestasi"
          className="flex items-center justify-center text-primary/80 hover:text-primary hover:underline"
        >
          Lebih Banyak
          <CircleChevronRightIcon size={18} className="ml-2 inline-block" />
        </Link>
      </div>

      <div className="justify-center">
        <Carousel
          opts={{
            align: "start",
          }}
          className="mx-auto w-full max-w-6xl"
        >
          <CarouselContent className="-ml-2 flex">
            {achievement.map((item) => {
              const imageUrl =
                item.image ||
                extractImageUrl(item.content) ||
                "/images/fallback.jpg";

              return (
                <CarouselItem
                  key={item.id}
                  className="pl-2 md:basis-1/2 lg:basis-1/3"
                >
                  <Link
                    href={`/article/prestasi/${item.id}`}
                    passHref
                    className="block h-full"
                  >
                    <div className="flex h-full flex-row overflow-hidden rounded-md border border-foreground/20 bg-white transition hover:shadow-card dark:bg-gray-800">
                      <div className="relative h-auto w-1/3 min-w-[100px]">
                        <Image
                          src={imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100px, 150px"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-3">
                        <div>
                          <h2 className="mb-2 line-clamp-2 text-sm font-semibold">
                            {item.title}
                          </h2>
                          <p className="line-clamp-2 text-xs text-muted-foreground">
                            {graphingText(stripHtmlTags(item.content), 60)}
                          </p>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <time>{formatDate(item.created_at)}</time>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
