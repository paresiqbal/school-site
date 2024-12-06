"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// components
import {
  stripHtmlTags,
  extractImageUrl,
  formatDate,
  truncateText,
} from "@/utils/textUtils";
import { NewsData } from "@/types/articleType";
import Loading from "@/components/Loading";

// ui lib
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Berita() {
  const [news, setNews] = useState<NewsData[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchNews() {
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_NEWS}`, {
          cache: "force-cache",
          next: { revalidate: 30 },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch news.");
        }

        const data = await res.json();
        const sortedNews = data.sort(
          (a: NewsData, b: NewsData) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );

        setNews(sortedNews);
        setFilteredNews(sortedNews);
        toast.success("Berita berhasil diambil");
      } catch (error) {
        console.error(error);
        setError("Gagal mengambil berita. Coba lagi nanti.");
        toast.error("Gagal mengambil berita");
      }
    }

    fetchNews();
  }, []);

  useEffect(() => {
    const filtered = news.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredNews(filtered);
  }, [searchQuery, news]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (error) return <p className="text-xl text-destructive">{error}</p>;

  return (
    <div className="mx-auto mt-4 flex max-w-[1200px] flex-col pt-6 font-[family-name:var(--font-geist-sans)] md:items-center md:justify-center md:pt-12">
      <div className="space-y-2 pb-8">
        <h1 className="scroll-m-20 text-balance text-4xl font-bold tracking-tight lg:text-5xl">
          Berita
        </h1>
      </div>

      <div className="mb-6 w-full max-w-3xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
          <Input
            type="text"
            placeholder="Cari berita..."
            value={searchQuery}
            onChange={handleSearch}
            className="h-12 w-full pl-10 text-lg"
          />
        </div>
      </div>

      {filteredNews.length > 0 ? (
        filteredNews.map((item) => {
          const imageUrl =
            item.image ||
            extractImageUrl(item.content) ||
            "/images/fallback.jpg";
          return (
            <div
              key={item.id}
              className="mb-6 flex max-w-3xl flex-col gap-2 overflow-hidden py-4 md:flex-row md:gap-4"
            >
              <div className="flex w-full flex-col items-start space-y-1 md:w-1/4 md:space-y-2">
                <span className="text-sm text-muted-foreground md:text-base">
                  {formatDate(item.created_at)}
                </span>
                <span className="hover:shadow-button cursor-pointer rounded-md border-2 border-foreground px-2 py-1 text-xs transition hover:bg-primary md:text-sm">
                  berita
                </span>
              </div>

              <div className="hidden md:block">
                <Separator
                  orientation="vertical"
                  className="h-full w-px bg-foreground p-0.5"
                />
              </div>

              <div className="flex w-full flex-col md:w-3/4">
                <div className="relative rounded-md border-2 border-foreground transition hover:shadow-card">
                  <Image
                    src={imageUrl}
                    width={500}
                    height={500}
                    alt={item.title}
                    priority
                    className="h-40 w-full object-cover md:h-48"
                  />
                  <span className="absolute bottom-2 right-2 rounded-md border-2 border-foreground bg-primary/90 px-2 py-1 text-xs text-white">
                    blog
                  </span>
                </div>
                <div className="mt-4">
                  <Link
                    href={`/article/berita/${item.id}`}
                    className="mb-2 text-lg font-semibold hover:underline md:text-xl"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-2 italic">
                    {truncateText(stripHtmlTags(item.content), 120)}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center gap-8">
          {searchQuery ? (
            <p className="text-lg font-bold">Tidak ada hasil yang ditemukan</p>
          ) : (
            <>
              <h1 className="text-lg font-bold">Loading...</h1>
              <Loading size="medium" />
            </>
          )}
        </div>
      )}
    </div>
  );
}
