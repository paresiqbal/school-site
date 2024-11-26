"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { stripHtmlTags, graphingText, formatDate } from "@/utils/textUtils";

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

export default function InfoSection() {
  const [announcement, setAnnouncement] = useState<AnnouncementData[]>([]);
  const [agenda, setAgenda] = useState<AgendaData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch announcements
  useEffect(() => {
    async function fetchAnnouncement() {
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ANNOUNCEMENT}`, {
          cache: "force-cache",
          next: { revalidate: 30 },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch announcement.");
        }

        const data = await res.json();

        const announcements = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : [];
        setAnnouncement(announcements);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setError("Server sedang error, coba lagi nanti.");
      }
    }

    fetchAnnouncement();
  }, []);

  // Fetch agendas
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

        const agendas = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : [];
        setAgenda(agendas);
      } catch (error) {
        console.error("Error fetching agendas:", error);
        setError("Server sedang error, coba lagi nanti.");
      }
    }

    fetchAgenda();
  }, []);

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
        <p className="text-center text-lg font-bold text-destructive">
          {error}
        </p>
      </div>
    );

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-8">
      <h2 className="text-sm text-muted-foreground">INFO & PENGUMUMAN</h2>
      <div className="items-baseline justify-between lg:flex lg:flex-row lg:gap-10">
        {/* Announcements Section */}
        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold">
            Informasi dan Pengumuman Terbaru
          </p>
          {announcement.length > 0 ? (
            announcement.slice(0, 3).map((item) => (
              <Link
                href={`/article/pengumuman/${item.id}`}
                key={item.id}
                passHref
              >
                <div className="group cursor-pointer rounded-md border-2 border-foreground p-4 transition hover:shadow-card">
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="mb-2 text-sm">
                    {graphingText(stripHtmlTags(item.content), 80)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              Belum ada pengumuman.
            </p>
          )}
        </div>

        {/* Agendas Section */}
        <div className="mt-8 flex flex-col gap-4">
          <p className="text-lg font-semibold">Jadwal dan Agenda Terdekat</p>
          {agenda.length > 0 ? (
            agenda.slice(0, 4).map((item) => (
              <Link href={`/article/agenda/${item.id}`} key={item.id} passHref>
                <div className="group cursor-pointer rounded-md border-2 border-foreground p-4 transition hover:shadow-card">
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="mb-2 text-sm">
                    {graphingText(stripHtmlTags(item.description), 50)}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              Belum ada agenda.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
