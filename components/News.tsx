"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";

// ui lib
import { AppContext } from "@/context/AppContext";
import { Toaster, toast } from "sonner";

// icons
import { Loader } from "lucide-react";

interface NewsData {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

export default function NewsComps() {
  const { token } = useContext(AppContext);
  const [news, setNews] = useState<NewsData[]>([]);
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="container mx-auto">
      <Toaster />
      {news.slice(0, 4).map((item) => (
        <div
          key={item.id}
          className="mb-2 flex flex-col md:flex-row md:items-center p-2"
        >
          {item.image && (
            <div className="w-full md:w-1/6 mb-2 md:mb-0 md:mr-4">
              <Image
                src={`http://localhost:8000/storage/${item.image}`}
                alt={item.title}
                width={150}
                height={100}
                className="rounded-md w-full h-auto object-cover"
              />
            </div>
          )}
          <div className="w-full md:w-5/6">
            <div className="py-2">
              <h2 className="text-sm font-bold md:text-md hover:underline">
                <Link href={`/dashboard/news/${item.id}`}>{item.title}</Link>
              </h2>
              <h3 className="text-xs md:text-sm">
                {formatDate(item.created_at)}
              </h3>
            </div>
            <div>
              <p className="text-xs md:text-sm">
                {graphingText(item.content, 130)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
