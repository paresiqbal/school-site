"use client";

import Link from "next/link";
import { Toaster } from "sonner";
import Topbar from "@/components/Topbar";
import { AgendaCard } from "@/components/AgendaCard";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AgendaData } from "@/types/articleType";

export default function ListAgenda() {
  const { token } = useContext(AppContext);
  const [agenda, setAgenda] = useState<AgendaData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAgenda();
  }, [token]);

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
      toast.success("Agenda berhasil diambil");
    } catch (error) {
      console.error(error);
      setError("Failed to load agenda. Please try again.");
      toast.error("Gagal mengambil agenda");
    }
  }

  const handleDelete = async (id: number) => {
    if (!token) {
      toast.error("Unauthorized. Tolong masuk terlebih dahulu.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_AGENDA}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete agenda.");
      }

      setAgenda((prevAgenda) => prevAgenda.filter((item) => item.id !== id));
      toast.success("Agenda berhasil dihapus");
    } catch (error) {
      console.error("Error deleting agenda:", error);
      toast.error("Gagal menghapus agenda.");
    }
  };

  if (error) return <p className="text-destructive">{error}</p>;

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-between pb-4 md:flex-row">
        <div className="mb-4 flex items-center md:mb-0">
          <Topbar />
          <Breadcrumb className="ml-4 hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>Daftar Agenda</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <Toaster />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {agenda.map((item) => (
          <AgendaCard key={item.id} agenda={item} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
