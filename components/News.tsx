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

export default function NewsPlugin() {
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
        setError("Gagal mengambil berita. Coba lagi nanti.");
      }
    }

    fetchNews();
  }, []);

  const graphingText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const formatDate = (dateString?: string | null): string => {
    if (!dateString) return "Date not available";

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (error) return <p className="text-destructive">{error}</p>;

  return (
    <div className="mx-auto w-full max-w-full justify-center overflow-hidden bg-rose-50 px-4 py-8 dark:bg-accent">
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
                <div className="flex h-full flex-col overflow-hidden rounded-md border-2 border-foreground transition hover:shadow-lg">
                  {/* Image Section with Fixed Height */}
                  <div className="relative h-48 w-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_STORAGE}/${item.image}`}
                      alt={item.title}
                      width={500}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content Section with Minimum Height */}
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        <time>{formatDate(item.created_at)}</time>
                      </div>
                      <h2 className="mb-2 text-base font-semibold">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm">
                        {graphingText(item.content, 80)}
                      </p>
                    </div>
                    <Link
                      href={`/article/berita/${item.id}`}
                      className="mt-4 inline-block font-semibold text-primary"
                    >
                      Baca selengkapnya
                    </Link>
                  </div>
                </div>
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
