"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface NewsData {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

export default function InfoPlugin() {
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

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mx-auto w-full max-w-5xl overflow-hidden px-4 py-8">
      <h2 className="mb-4 text-sm text-muted-foreground">INFO & PENGUMUMAN</h2>
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold">
          Informasi dan Pengumuman Terbaru
        </p>
        {news.slice(0, 3).map((item) => (
          <Link href={`/article/berita/${item.id}`} key={item.id} passHref>
            <div className="group cursor-pointer rounded-md border-2 border-foreground p-4 transition hover:shadow-card">
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="mb-2 text-sm">{graphingText(item.content, 90)}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(item.created_at)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
