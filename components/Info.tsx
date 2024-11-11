"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface AnnouncementData {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

interface AgendaData {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
}

export default function InfoPlugin() {
  const [announcement, setAnnouncement] = useState<AnnouncementData[]>([]);
  const [agenda, setAgenda] = useState<AgendaData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnnouncement() {
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ANNOUNCEMENT}`, {
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
      } catch (error) {
        console.error(error);
        setError("Server sedang error coba lagi nanti.");
      }
    }

    fetchAnnouncement();
  }, []);

  useEffect(() => {
    async function fetchAgenda() {
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_AGENDA}`, {
          cache: "no-cache",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch agenda.");
        }
        const data = await res.json();
        setAgenda(data);
      } catch (error) {
        console.error(error);
        setError("Server sedang error coba lagi nanti.");
      }
    }

    fetchAgenda();
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

  if (error)
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center py-2">
        <Image
          src="/assets/500error.svg"
          width={200}
          height={200}
          alt="error"
          className="mb-4 opacity-90"
        />
        <p className="text-center text-lg font-bold text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-8">
      <h2 className="text-sm text-muted-foreground">INFO & PENGUMUMAN</h2>
      <div className="items-baseline justify-between lg:flex lg:flex-row lg:gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold">
            Informasi dan Pengumuman Terbaru
          </p>
          {announcement.slice(0, 3).map((item) => (
            <Link
              href={`/article/pengumuman/${item.id}`}
              key={item.id}
              passHref
            >
              <div className="group cursor-pointer rounded-md border-2 border-foreground p-4 transition hover:shadow-card">
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="mb-2 text-sm">{graphingText(item.content, 80)}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(item.created_at)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <p className="text-lg font-semibold">Jadwal dan Agenda Terdekat</p>
          {agenda.slice(0, 4).map((item) => (
            <Link href={`/article/agenda/${item.id}`} key={item.id} passHref>
              <div className="group cursor-pointer rounded-md border-2 border-foreground p-4 transition hover:shadow-card">
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="mb-2 text-sm">
                  {graphingText(item.description, 50)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
