"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";

// components
import Topbar from "@/components/Topbar";
import { AppContext } from "@/context/AppContext";

// ui lib
import {
  Card,
  CardContent,
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
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface AgendaData {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
}

export default function ListAgenda() {
  const { token } = useContext(AppContext);
  const [agenda, setAgenda] = useState<AgendaData[]>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAgenda() {
      setError(null);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/agenda", {
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

    fetchAgenda();
  }, [token]);

  const graphingText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const handleDelete = async (id: number) => {
    if (!token) {
      toast.error("Unauthorized. TOlong masuk terlebihdahulu.");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/agenda/${id}`, {
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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
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
                <p>Daftar Agenda</p>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* List */}
      <Toaster />
      {agenda.map((item) => (
        <Card
          key={item.id}
          className="mb-2 w-full max-w-xs rounded-md bg-gray-50 p-2 shadow-sm md:w-2/5"
        >
          <div className="w-full">
            <Image
              src="/assets/bell.png"
              width={200}
              height={150}
              alt="bell"
              className="h-40 w-full rounded-t-md bg-gray-100 object-contain"
            />
          </div>
          <CardHeader className="p-2">
            <CardTitle className="md:text-md text-sm font-semibold">
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <p className="text-xs text-gray-700">
              {graphingText(item.description, 100)}
            </p>
            <div className="mt-1 text-xs text-gray-500">
              <p>
                <strong>Mulai:</strong> {formatDate(item.start_date)}
              </p>
              <p>
                <strong>Sampai:</strong> {formatDate(item.end_date)}
              </p>
            </div>
          </CardContent>
          <CardFooter className="mt-2 flex justify-end gap-2 p-2">
            <Button
              variant="destructive"
              onClick={() => handleDelete(item.id)}
              className="flex items-center gap-1 px-2 py-1 text-xs"
            >
              Delete
              <Trash2 className="h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
