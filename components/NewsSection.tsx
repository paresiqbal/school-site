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

interface NewsData {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  created_at: string;
}

export default function NewsSection() {
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

  const stripHtmlTags = (html: string): string => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const extractImageUrl = (html: string): string | null => {
    if (!html) return null;
    const doc = new DOMParser().parseFromString(html, "text/html");
    const img = doc.querySelector("img");
    return img ? img.src : null;
  };

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
      <h2 className="mb-4 text-center text-sm text-muted-foreground">
        BERITA TERBARU
      </h2>
      <div className="mx-auto my-4 flex max-w-6xl justify-between">
        <p className="text-lg font-semibold">Update Berita Terbaru</p>
        <Link
          href="/article/berita"
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
          <CarouselContent className="flex gap-4">
            {news.map((item) => {
              const imageUrl =
                item.image ||
                extractImageUrl(item.content) ||
                "/images/fallback.jpg";

              return (
                <CarouselItem
                  key={item.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="flex h-full flex-col rounded-md border-2 border-foreground bg-white transition hover:shadow-card dark:bg-neutral-900">
                    <div className="relative h-48 w-full">
                      <Image
                        src={imageUrl}
                        alt={item.title}
                        width={500}
                        height={300}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          <time>{formatDate(item.created_at)}</time>
                        </div>
                        <h2 className="mb-2 text-base font-semibold">
                          {item.title}
                        </h2>
                        <p className="mt-2 text-sm">
                          {graphingText(stripHtmlTags(item.content), 80)}
                        </p>
                      </div>
                      <Link
                        href={`/article/berita/${item.id}`}
                        className="mt-4 inline-block font-semibold text-primary hover:underline"
                      >
                        Baca selengkapnya
                      </Link>
                    </div>
                  </div>
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
