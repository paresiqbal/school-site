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
import { Separator } from "@/components/ui/separator";

// icons
import { Trash2 } from "lucide-react";

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
          cache: "force-cache",
          next: {
            revalidate: 30,
          },
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
      {/* Form */}
      <Toaster />
      {agenda.map((item) => (
        <Card
          key={item.id}
          className="mb-4 flex flex-col p-4 md:flex-row md:items-center"
        >
          <div className="w-full md:w-3/4">
            <CardHeader>
              <CardTitle className="text-md md:text-xl">
                <p className="text-lg font-bold">{item.title}</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg">{graphingText(item.description, 200)}</h3>
            </CardContent>
          </div>
          <CardFooter>
            <div className="flex h-5 items-center space-x-4 text-sm">
              <Separator orientation="vertical" />
              <p>
                <strong>Start Date:</strong> {formatDate(item.start_date)}
              </p>
              <p>
                <strong>End Date:</strong> {formatDate(item.end_date)}
              </p>
            </div>
          </CardFooter>
          <CardFooter className="flex gap-4">
            <Button
              variant="destructive"
              onClick={() => handleDelete(item.id)}
              className="flex items-center gap-2"
            >
              Delete
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
