"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// External library
import { toast } from "sonner";

// UI library
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface AnnouncementData {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

export default function Pengumuman() {
  const [announcement, setAnnouncement] = useState<AnnouncementData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnnouncement() {
      setError(null);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/announcement", {
          cache: "force-cache",
          next: {
            revalidate: 30,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch announcement.");
        }

        const data = await res.json();
        setAnnouncement(data);
        toast.success("Pengumuman berhasil diambil");
      } catch (error) {
        console.error(error);
        setError("Gagal mengambil pengumuman. Coba lagi nanti.");
        toast.error("Gagal mengambil pengumuman");
      }
    }

    fetchAnnouncement();
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
          Pengumuman
        </h1>
      </div>

      {announcement.length > 0 ? (
        announcement.map((item) => (
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
                  src={`http://localhost:8000/storage/${item.image}`}
                  width={500}
                  height={500}
                  alt={item.title}
                  className="h-40 w-full rounded-md object-cover md:h-48"
                />
                <span className="absolute bottom-2 right-2 rounded-md bg-primary bg-opacity-60 px-2 py-1 text-xs text-background md:text-sm">
                  pengumuman
                </span>
              </div>
              <div className="mt-4">
                <Link
                  href={`/pengumuman/${item.id}`}
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
        <p className="text-center text-gray-500">No announcement available.</p>
      )}
    </div>
  );
}