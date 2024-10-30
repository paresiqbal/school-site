"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast, Toaster } from "sonner";

interface NewsData {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

export default function Page(props: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null);
  const [news, setNews] = useState<NewsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const params = await props.params;
      setSlug(params.slug);
    };

    fetchParams();
  }, [props.params]);

  useEffect(() => {
    if (!slug) return;

    async function fetchNewsDetail() {
      setError(null);
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/news/${slug}`, {
          cache: "force-cache",
          next: {
            revalidate: 30,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch news detail.");
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

    fetchNewsDetail();
  }, [slug]);

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
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Toaster />

      {news ? (
        <>
          <div className="mb-6 w-full rounded-md">
            <Image
              src={`http://localhost:8000/storage/${news.image}`}
              alt={news.title}
              width={500}
              height={500}
              priority
              className="h-auto w-full rounded-lg"
            />
          </div>

          <h1 className="mb-4 text-3xl font-bold">{news.title}</h1>

          <div className="mb-4 flex items-center space-x-2">
            <span className="text-sm">{formatDate(news.created_at)}</span>
            <span>•</span>
            <span className="rounded-md bg-foreground px-3 py-1 text-xs text-background">
              Berita
            </span>
          </div>

          <hr className="my-4 border-t border-gray-400" />

          <div className="space-y-4 leading-relaxed">
            {news.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center">Loading berita...</p>
      )}
    </div>
  );
}
