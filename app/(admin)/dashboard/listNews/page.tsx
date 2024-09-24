"use client";

import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: number;
  title: string;
  content: string;
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="container mx-auto">
      <Toaster />
      {news.map((item) => (
        <Card key={item.id} className="mb-4">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{item.content}</p>
          </CardContent>
        </Card>
      ))}
      <Button className="mt-4" onClick={() => toast.success("Refreshed")}>
        Refresh News
      </Button>
    </div>
  );
}
