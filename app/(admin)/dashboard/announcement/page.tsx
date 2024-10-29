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

export default function ListAnnouncement() {
  const { token } = useContext(AppContext);
  const [announcement, setAnnouncement] = useState<AnnouncementData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnnouncement() {
      setError(null);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/announcement", {
          cache: "force-cache",
          next: {
            revalidate: 60,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch announcement.");
        }

        const data = await res.json();
        setAnnouncement(data);
        toast.success("Pengumuman berhasil dimuat");
      } catch (error) {
        console.error(error);
        setError("Failed to load announcement. Please try again.");
        toast.error("Gagal memuat pengumuman. Silahkan coba lagi.");
      }
    }

    fetchAnnouncement();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!token) {
      toast.error("Unauthorized. Tolong masuk.");
      return;
    }
    // amm
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/announcement/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete announcement.");
      }

      setAnnouncement((prevAnnouncement) =>
        prevAnnouncement.filter((item) => item.id !== id),
      );
      toast.success("Pengumuman berhasil dihapus.");
    } catch (error) {
      console.error("Error deleting announcement:", error);
      toast.error("Gagal menghapus pengumuman.");
    }
  };

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

      {/* Form */}
      <Toaster />
      {announcement.map((item) => (
        <Card
          key={item.id}
          className="mb-4 flex flex-col p-4 md:flex-row md:items-center"
        >
          {item.image && (
            <div className="mb-4 w-full md:mb-0 md:mr-4 md:w-1/4">
              <Image
                src={`http://localhost:8000/storage/${item.image}`}
                alt={item.title}
                width={400}
                height={350}
                className="h-auto w-full rounded-lg object-cover"
              />
            </div>
          )}
          <div className="w-full md:w-3/4">
            <CardHeader>
              <CardTitle className="text-lg hover:underline md:text-xl">
                <Link href={`/dashboard/announcements/${item.id}`}>
                  {item.title}
                </Link>
              </CardTitle>
              <CardDescription>{formatDate(item.created_at)}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="italic">{graphingText(item.content, 120)}</p>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Link href={`/dashboard/announcements/${item.id}`}>
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
      ))}
    </div>
  );
}
