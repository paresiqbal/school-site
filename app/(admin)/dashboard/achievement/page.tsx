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

interface AchievementData {
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

export default function ListAchievement() {
  const { token } = useContext(AppContext);
  const [achievement, setAchievement] = useState<AchievementData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAchievement() {
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ACHIEVEMENT}`, {
          cache: "no-cache",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch achievement.");
        }

        const data = await res.json();
        setAchievement(data);
        toast.success("Prestasi Siswa berhasil diambil");
      } catch (error) {
        console.error(error);
        setError("Gagal mengambil prestasi Siswa. Coba lagi nanti.");
        toast.error("Gagal mengambil prestasi Siswa");
      }
    }

    fetchAchievement();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!token) {
      toast.error("Unauthorized. Please log in.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ACHIEVEMENT}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Gagal menghapus prestasi Siswa.");
      }

      setAchievement((prevAchievement) =>
        prevAchievement.filter((item) => item.id !== id),
      );
      toast.success("Prestasi Siswa berhasil dihapus");
    } catch (error) {
      console.error("Error menghapus prestasi Siswa:", error);
      toast.error("Gagal menghapus prestasi Siswa.");
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
                <p>Daftar Prestasi Siswa</p>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <Toaster />
      {achievement.length === 0 ? (
        <p className="text-center">No achievement available.</p>
      ) : (
        achievement.map((item) => {
          const imageUrl = item.image
            ? `${process.env.NEXT_PUBLIC_API_STORAGE}/${item.image}`
            : extractImageUrl(item.content);

          const contentText = truncateText(stripHtmlTags(item.content), 150);

          return (
            <Card
              key={item.id}
              className="mb-4 flex flex-col items-start rounded-lg p-2 shadow-md md:flex-row md:p-4"
            >
              {imageUrl && (
                <div className="mb-2 w-full md:mb-0 md:mr-4 md:w-1/4">
                  <Image
                    src={imageUrl}
                    alt={item.title}
                    width={400}
                    height={350}
                    className="h-auto w-full rounded-lg object-cover"
                  />
                </div>
              )}
              <div className="w-full md:w-3/4">
                <CardHeader>
                  <CardTitle className="text-base font-semibold hover:underline md:text-lg">
                    <Link href={`/dashboard/achievement/${item.id}`}>
                      {item.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {formatDate(item.created_at)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm italic md:text-base">{contentText}</p>
                </CardContent>
                <CardFooter className="mt-2 flex gap-2 md:gap-4">
                  <Link href={`/dashboard/achievement/${item.id}`}>
                    <Button className="flex items-center gap-1 px-3 py-1 text-sm md:gap-2 md:px-4 md:py-2">
                      <Pencil className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="hidden md:inline">Edit</span>
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm md:gap-2 md:px-4 md:py-2"
                  >
                    <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="hidden md:inline">Delete</span>
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
