"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";

// ui lib
import { AppContext } from "@/context/AppContext";
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
import { Loader, Trash2 } from "lucide-react";

interface AgendaData {
  id: number;
  title: string;
  description: string;
}

export default function ListAgenda() {
  const { token } = useContext(AppContext);
  const [agenda, setAgenda] = useState<AgendaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAgenda() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/agenda", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch agenda.");
        }
        const data = await res.json();
        setAgenda(data);
        toast.success("Agenda loaded successfully");
      } catch (error) {
        console.error(error);
        setError("Failed to load agenda. Please try again.");
        toast.error("Failed to load agenda");
      } finally {
        setLoading(false);
      }
    }

    fetchAgenda();
  }, [token]);

  const graphingText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const handleDelete = async (id: number) => {
    if (!token) {
      toast.error("Unauthorized. Please log in.");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/news/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete news.");
      }

      setAgenda((prevNews) => prevNews.filter((item) => item.id !== id));
      toast.success("News deleted successfully");
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.error("Failed to delete news.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="container mx-auto">
      <Breadcrumb className="hidden md:flex pb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>List News</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Form */}
      <Toaster />
      {agenda.map((item) => (
        <Card
          key={item.id}
          className="mb-4 flex flex-col md:flex-row md:items-center p-4"
        >
          <div className="w-full md:w-3/4">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">
                <Link href={`/dashboard/news/${item.id}`}>{item.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{graphingText(item.description, 200)}</p>
            </CardContent>
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
          </div>
        </Card>
      ))}
      <Button className="mt-4" onClick={() => toast.success("Refreshed")}>
        Refresh Agenda
      </Button>
    </div>
  );
}
