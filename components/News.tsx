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
    <div>
      <h1>BERITA TERBARU</h1>
      <div>
        {news.map((item) => (
          <div key={item.id}>
            <Link href={`/berita/${item.id}`}>
              <a>
                <h2>{item.title}</h2>
                <p>{graphingText(item.content, 100)}</p>
                <p>{formatDate(item.created_at)}</p>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
