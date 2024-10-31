"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// External library
import { toast } from "sonner";

// UI library
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface NewsData {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

export default function Berita() {
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
        toast.success("Berita berhasil diambil");
      } catch (error) {
        console.error(error);
        setError("Gagal mengambil berita. Coba lagi nanti.");
        toast.error("Gagal mengambil berita");
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
    <div className="container mx-auto mb-8 flex max-w-[1200px] flex-col px-4 pt-6 md:px-0 md:pt-12">
      <div className="space-y-2">
        <h1 className="mb-2 text-3xl font-bold underline decoration-emerald-500 underline-offset-8 md:mb-6 md:text-5xl">
          Berita
        </h1>
      </div>

      {news.length > 0 ? (
        news.map((item) => (
          <div
            key={item.id}
            className="mb-6 flex max-w-3xl flex-col gap-2 overflow-hidden py-4 md:flex-row md:gap-4"
          >
            <div className="flex w-full flex-col items-start space-y-1 md:w-1/4 md:space-y-2">
              <span className="text-sm text-muted-foreground md:text-base">
                {formatDate(item.created_at)}
              </span>
              <span className="rounded-md bg-primary px-2 py-1 text-xs text-background md:text-sm">
                tags
              </span>
            </div>

            <div className="hidden md:block">
              <Separator
                orientation="vertical"
                className="h-full w-px bg-gray-400"
              />
            </div>

            <div className="flex w-full flex-col md:w-3/4">
              <div className="relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_STORAGE}/${item.image}`}
                  width={500}
                  height={500}
                  alt={item.title}
                  className="h-40 w-full rounded-md object-cover md:h-48"
                />
                <span className="absolute bottom-2 right-2 rounded-md bg-primary bg-opacity-60 px-2 py-1 text-xs text-background md:text-sm">
                  berita
                </span>
              </div>
              <div className="mt-4">
                <Link
                  href={`/berita/${item.id}`}
                  className="mb-2 text-lg font-semibold hover:underline md:text-xl"
                >
                  {item.title}
                </Link>
                <p className="text-sm italic md:text-base">
                  {graphingText(item.content, 120)}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No news available.</p>
      )}
    </div>
  );
}
