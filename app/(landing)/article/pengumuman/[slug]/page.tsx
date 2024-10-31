"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast, Toaster } from "sonner";

interface AnnouncementData {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

export default function AnnouncementDetails(props: {
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
          `http://127.0.0.1:8000/api/announcement/${slug}`,
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

  if (error) return <p className="text-destructive">{error}</p>;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Toaster />

      {announcement ? (
        <>
          <div className="mb-6 w-full rounded-md">
            <Image
              src={`http://localhost:8000/storage/${announcement.image}`}
              alt={announcement.title}
              width={500}
              height={500}
              priority
              className="h-auto w-full rounded-lg"
            />
          </div>

          <h1 className="col-span-7 text-4xl font-bold text-gray-800 sm:text-6xl">
            {announcement.title}
          </h1>

          <div className="mb-4 flex flex-col gap-4 pt-4 text-muted-foreground">
            <span>{formatDate(announcement.created_at)}</span>

            <span className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-gray-500"></div>
              <p>Admin</p>
            </span>
            <div>
              <span className="rounded-md border px-4 py-2">Pengumuman</span>
            </div>
          </div>

          <hr className="my-4 border-t border-gray-400" />

          <div className="space-y-4 leading-relaxed">
            {announcement.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center">Loading pengumuman...</p>
      )}
    </div>
  );
}
