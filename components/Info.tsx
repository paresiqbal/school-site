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
    <div className="rounded-lg bg-gray-100 p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Informasi dan Berita Terbaru
      </h2>
      <div className="flex flex-col gap-4">
        {news.map((item) => (
          <Link href={`/news/${item.id}`} key={item.id} passHref>
            <div className="group transform cursor-pointer rounded-lg border-2 border-gray-300 bg-white p-6 transition-transform hover:scale-105 hover:shadow-lg">
              <h3 className="mb-2 text-xl font-semibold text-gray-800 group-hover:text-blue-600">
                {item.title}
              </h3>
              <p className="mb-2 text-gray-700">
                {graphingText(item.content, 50)}
              </p>
              <p className="text-sm text-gray-500">
                {formatDate(item.created_at)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
