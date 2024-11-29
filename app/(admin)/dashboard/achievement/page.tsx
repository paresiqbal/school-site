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
import { AchievementCard } from "@/components/AchievementCard";
import { AchievementData } from "@/types/articleType";

export default function ListAchievement() {
  const { token } = useContext(AppContext);
  const [achievements, setAchievements] = useState<AchievementData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  async function fetchAchievements() {
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ACHIEVEMENT}`, {
        cache: "no-cache",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch achievements.");
      }

      const data = await res.json();
      setAchievements(Array.isArray(data) ? data : data.data || []);
      toast.success("Pengumuman berhasil diambil");
    } catch (error) {
      console.error(error);
      setError("Failed to connect.");
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
        `${process.env.NEXT_PUBLIC_API_ACHIEVEMENT}/${id}`,
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

      setAchievements((prevAchievements) =>
        prevAchievements.filter((item) => item.id !== id),
      );
      toast.success("Pengumuman berhasil dihapus");
    } catch (error) {
      console.error("Error menghapus pengumuman:", error);
      toast.error("Gagal menghapus pengumuman.");
    }
  };

  if (error) return <p className="text-destructive">{error}</p>;

  if (!Array.isArray(achievements) || achievements.length === 0) {
    return <p className="text-center">No achievements available.</p>;
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
      {achievements.map((achievement) => (
        <AchievementCard
          key={achievement.id}
          achievement={achievement}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
