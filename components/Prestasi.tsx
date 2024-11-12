"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ui comps
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";

interface NewsData {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

export default function PrestasiPlugin() {
  const [news, setNews] = useState<NewsData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_NEWS}`, {
          cache: "force-cache",
          next: {
            revalidate: 30,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch news.");
        }

        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error(error);
        setError("Gagal mengambil prestasi siswa. Coba lagi nanti.");
      }
    }

    fetchNews();
  }, []);

  const formatDate = (dateString?: string | null): string => {
    if (!dateString) return "Date not available";

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (error)
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center py-2">
        <Image
          src="/assets/500error.svg"
          width={200}
          height={200}
          alt="error"
          className="mb-4 opacity-90"
        />
        <p className="text-center text-lg font-bold text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="mx-auto w-full justify-center bg-rose-50 px-4 py-8 dark:bg-accent">
      <h2 className="mb-4 text-center text-sm text-muted-foreground">
        PRESTASI SISWA
      </h2>

      <div className="flex justify-center">
        <Carousel
          opts={{
            align: "start",
          }}
          className="mx-auto w-full max-w-6xl"
        >
          <CarouselContent className="flex gap-4">
            {news.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                <Link
                  href={`/article/berita/${item.id}`}
                  key={item.id}
                  passHref
                >
                  <div className="flex flex-col rounded-md border-2 border-foreground transition hover:shadow-card sm:flex-row">
                    <div className="relative h-32 w-full sm:h-auto sm:w-2/5">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_STORAGE}/${item.image}`}
                        alt="gambar"
                        width={500}
                        height={500}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <h2 className="mb-2 text-sm font-semibold">
                        {item.title}
                      </h2>
                      <div className="flex items-center text-sm">
                        <time>{formatDate(item.created_at)}</time>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="mt-8 flex justify-center">
        <Link href="/article/berita">
          <Button className="hover:shadow-button border-2 border-foreground">
            Lihat Semua
          </Button>
        </Link>
      </div>
    </div>
  );
}
