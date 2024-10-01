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

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

export default function ListNews() {
  const { token } = useContext(AppContext);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/news", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch news.");
        }
        const data = await res.json();
        setNews(data);
        toast.success("News loaded successfully");
      } catch (error) {
        console.error(error);
        setError("Failed to load news. Please try again.");
        toast.error("Failed to load news");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [token]);

  const truncateText = (text: string, limit: number) => {
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

      setNews((prevNews) => prevNews.filter((item) => item.id !== id));
      toast.success("News deleted successfully");
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.error("Failed to delete news.");
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

  if (loading) return <p>Loading...</p>;
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
      {news.map((item) => (
        <Card key={item.id} className="mb-4 flex flex-row items-center">
          <div className="w-3/4">
            <CardHeader className="flex">
              <CardTitle className="text-xl">{item.title}</CardTitle>
              <CardDescription>{formatDate(item.created_at)}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{truncateText(item.content, 255)}</p>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Link href={`/dashboard/news/${item.id}`}>
                <Button className="flex items-center gap-2">
                  See more
                  <span>
                    <Pencil className="h-4 w-4" />
                  </span>
                </Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => handleDelete(item.id)}
                className="flex items-center gap-2"
              >
                Delete
                <span>
                  <Trash2 className="h-4 w-4" />
                </span>
              </Button>
            </CardFooter>
          </div>
          {item.image && (
            <Image
              src={`http://localhost:8000/${item.image}`}
              alt={item.title}
              width={250}
              height={150}
              className="rounded-lg"
            />
          )}
        </Card>
      ))}
      <Button className="mt-4" onClick={() => toast.success("Refreshed")}>
        Refresh News
      </Button>
    </div>
  );
}
