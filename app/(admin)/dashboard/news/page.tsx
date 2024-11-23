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

import { NewsData } from "@/types/articleType";
import { NewsCard } from "@/components/NewsCard";

export default function ListNews() {
  const { token } = useContext(AppContext);
  const [newss, setNewss] = useState<NewsData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNewss();
  }, []);

  async function fetchNewss() {
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_NEWS}`, {
        cache: "no-cache",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch newss.");
      }

      const data = await res.json();
      setNewss(Array.isArray(data) ? data : data.data || []);
      toast.success("Berita berhasil diambil");
    } catch (error) {
      console.error(error);
      setError("Gagal mengambil berita. Coba lagi nanti.");
      toast.error("Gagal mengambil berita");
    }
  }

  const handleDelete = async (id: number) => {
    if (!token) {
      toast.error("Unauthorized. Please log in.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_NEWS}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Gagal menghapus berita.");
      }

      setNewss((prevNewss) => prevNewss.filter((item) => item.id !== id));
      toast.success("Berita berhasil dihapus");
    } catch (error) {
      console.error("Error menghapus berita:", error);
      toast.error("Gagal menghapus berita.");
    }
  };

  if (error) return <p className="text-destructive">{error}</p>;

  if (!Array.isArray(newss) || newss.length === 0) {
    return <p className="text-center">No newss available.</p>;
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
              <BreadcrumbPage>Daftar Berita</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <Toaster />
      {newss.map((news) => (
        <NewsCard key={news.id} news={news} onDelete={handleDelete} />
      ))}
    </div>
  );
}
