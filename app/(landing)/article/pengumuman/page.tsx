"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface AnnouncementData {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  created_at: string;
}

export default function Pengumuman() {
  const [announcement, setAnnouncement] = useState<AnnouncementData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnnouncement() {
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ANNOUNCEMENT}`, {
          cache: "force-cache",
          next: { revalidate: 30 },
        });

        if (!res.ok) {
          throw new Error(
            `Failed to fetch announcement. Status: ${res.status}`,
          );
        }

        const responseBody = await res.text();

        const data = JSON.parse(responseBody);

        setAnnouncement(Array.isArray(data) ? data : data?.data || []);
        toast.success("Pengumuman berhasil diambil");
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Gagal mengambil pengumuman. Coba lagi nanti.");
        toast.error("Gagal mengambil pengumuman");
      }
    }

    fetchAnnouncement();
  }, []);

  const stripHtmlTags = (html: string): string => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const graphingText = (text: string, limit: number) =>
    text.length > limit ? text.substring(0, limit) + "..." : text;

  const extractImageUrl = (html: string): string | null => {
    if (!html) return null;
    const doc = new DOMParser().parseFromString(html, "text/html");
    const img = doc.querySelector("img");
    return img ? img.src : null;
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
    <div className="mx-auto mt-4 flex max-w-[1200px] flex-col pt-6 font-[family-name:var(--font-geist-sans)] md:items-center md:justify-center md:pt-12">
      <div className="space-y-2 pb-8">
        <h1 className="scroll-m-20 text-balance text-4xl font-bold tracking-tight lg:text-5xl">
          Pengumuman
        </h1>
      </div>

      {announcement.length > 0 ? (
        announcement.map((item) => {
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
                  pengumuman
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
                    href={`/article/pengumuman/${item.id}`}
                    className="mb-2 text-lg font-semibold hover:underline md:text-xl"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-2 italic">
                    {graphingText(stripHtmlTags(item.content), 120)}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">No announcement available.</p>
      )}
    </div>
  );
}
