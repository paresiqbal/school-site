"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast, Toaster } from "sonner";

interface AnnouncementData {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  created_at: string;
}

export default function AnnouncementDetail(props: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState<AnnouncementData | null>(
    null,
  );
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

    async function fetchAnnouncementDetail() {
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ANNOUNCEMENT}/${slug}`,
          {
            cache: "force-cache",
            next: {
              revalidate: 30,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch announcement detail.");
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

    fetchAnnouncementDetail();
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

  const extractImageUrl = (html: string): string | null => {
    if (!html) return null;
    const doc = new DOMParser().parseFromString(html, "text/html");
    const img = doc.querySelector("img");
    return img ? img.src : null;
  };

  if (error) return <p className="text-destructive">{error}</p>;

  return (
    <div className="container mx-auto max-w-2xl py-8 font-[family-name:var(--font-geist-sans)]">
      <Toaster />

      {announcement ? (
        <>
          <div className="mb-6 w-full rounded-md border-2 border-foreground shadow-card">
            <Image
              src={
                announcement.image ||
                extractImageUrl(announcement.content) ||
                "/images/fallback.jpg" // Fallback image
              }
              alt={announcement.title}
              width={800}
              height={800}
              priority
              className="h-auto w-full"
            />
          </div>

          <h1 className="text-3xl font-bold lg:text-4xl">
            {announcement.title}
          </h1>

          <div className="mb-4 flex flex-col gap-4 pt-4 text-muted-foreground">
            <span>{formatDate(announcement.created_at)}</span>

            <span className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-primary/80"></div>
              <p>Admin</p>
            </span>
            <div>
              <span className="hover:shadow-button rounded-md border-2 border-foreground px-4 py-2 transition">
                Pengumuman
              </span>
            </div>
          </div>

          <hr className="my-4 border-2 border-t border-foreground" />

          <div
            className="space-y-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: announcement.content }}
          ></div>
        </>
      ) : (
        <p className="text-center">Loading pengumuman...</p>
      )}
    </div>
  );
}
