"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";

// ui lib
import { AppContext } from "@/context/AppContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// icons
import { Pencil, Trash2 } from "lucide-react";
import Topbar from "@/components/Topbar";

interface AnnouncementData {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

// Utility to strip HTML tags
const stripHtmlTags = (html: string): string => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

// Utility to truncate text
const truncateText = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  return text.substring(0, limit).trimEnd() + "...";
};

// Utility to extract the first image URL from content
const extractImageUrl = (html: string): string | null => {
  if (!html) return null;
  const doc = new DOMParser().parseFromString(html, "text/html");
  const img = doc.querySelector("img");
  return img ? img.src : null;
};

export default function ListAnnouncement() {
  const { token } = useContext(AppContext);
  const [announcement, setAnnouncement] = useState<AnnouncementData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnnouncement() {
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ANNOUNCEMENT}`, {
          cache: "no-cache",
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
  }, [token]);

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

      setAnnouncement((prevAnnouncement) =>
        prevAnnouncement.filter((item) => item.id !== id),
      );
      toast.success("Pengumuman berhasil dihapus");
    } catch (error) {
      console.error("Error menghapus pengumuman:", error);
      toast.error("Gagal menghapus pengumuman.");
    }
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
    <div className="container mx-auto">
      <div className="flex items-center justify-between pb-4">
        <div className="flex">
          <Topbar />
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dasboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>
                <p>Daftar Pengumuman</p>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <Toaster />
      {announcement.length === 0 ? (
        <p className="text-center text-gray-500">No announcement available.</p>
      ) : (
        announcement.map((item) => {
          const imageUrl = item.image
            ? `${process.env.NEXT_PUBLIC_API_STORAGE}/${item.image}`
            : extractImageUrl(item.content);

          const contentText = truncateText(stripHtmlTags(item.content), 150);

          return (
            <Card key={item.id} className="mb-4 flex flex-row items-start p-4">
              {imageUrl && (
                <div className="mr-4 w-1/4">
                  <Image
                    src={imageUrl}
                    alt={item.title}
                    width={400}
                    height={350}
                    className="h-48 w-full rounded-lg object-cover"
                  />
                </div>
              )}
              <div className="w-3/4">
                <CardHeader>
                  <CardTitle className="text-lg hover:underline md:text-xl">
                    <Link href={`/dashboard/announcement/${item.id}`}>
                      {item.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {formatDate(item.created_at)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="italic">{contentText}</p>
                </CardContent>
                <CardFooter className="flex gap-4">
                  <Link href={`/dashboard/announcement/${item.id}`}>
                    <Button className="flex items-center gap-2">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
}
