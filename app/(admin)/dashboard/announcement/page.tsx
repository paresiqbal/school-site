"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { AppContext } from "@/context/AppContext";
import { Toaster, toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Topbar from "@/components/Topbar";
import { AnnouncementCard } from "@/components/AnnouncementCard";
import { AnnouncementData } from "@/types/articleType";

export default function ListAnnouncement() {
  const { token } = useContext(AppContext);
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ANNOUNCEMENT}`, {
        cache: "no-cache",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch announcements.");
      }

      const data = await res.json();
      setAnnouncements(Array.isArray(data) ? data : data.data || []);
      toast.success("Pengumuman berhasil diambil");
    } catch (error) {
      console.error(error);
      setError("Gagal mengambil pengumuman. Coba lagi nanti.");
      toast.error("Gagal mengambil pengumuman");
    }
  }

  const handleDelete = async (id: number) => {
    if (!token) {
      toast.error("Unauthorized. Please log in.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ANNOUNCEMENT}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Gagal menghapus pengumuman.");
      }

      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.filter((item) => item.id !== id),
      );
      toast.success("Pengumuman berhasil dihapus");
    } catch (error) {
      console.error("Error menghapus pengumuman:", error);
      toast.error("Gagal menghapus pengumuman.");
    }
  };

  if (error) return <p className="text-destructive">{error}</p>;

  if (!Array.isArray(announcements) || announcements.length === 0) {
    return <p className="text-center">No announcements available.</p>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between pb-4">
        <div className="flex">
          <Topbar />
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>Daftar Pengumuman</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <Toaster />
      {announcements.map((announcement) => (
        <AnnouncementCard
          key={announcement.id}
          announcement={announcement}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
