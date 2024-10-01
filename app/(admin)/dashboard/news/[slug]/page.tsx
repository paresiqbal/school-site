"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// ui lib
import { Toaster } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NewsDetail {
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

type DetailNewsProps = { params: { slug: string } };

export default function DetailNews(props: DetailNewsProps) {
  const { params } = props;
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setError(null);
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/news/${params.slug}`
        );
        if (!res.ok) {
          throw new Error(`Error fetching news: ${res.statusText}`);
        }
        const data = await res.json();
        setNewsDetail(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [params.slug]);

  const formatDate = (dateString?: string | null): string => {
    if (!dateString) return "Date not available";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderContent = (content: string) => {
    return content
      .split("\n")
      .map((text: string, index: number) => <p key={index}>{text}</p>);
  };

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
            <BreadcrumbPage>Detail News</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{newsDetail?.title}</CardTitle>
          <CardDescription>
            {formatDate(newsDetail?.created_at)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {newsDetail?.image && (
              <Image
                src={`http://localhost:8000/${newsDetail.image}`}
                width={800}
                height={600}
                alt="News"
                className="rounded-lg shadow"
              />
            )}
            <div className="flex flex-col gap-3">
              {newsDetail?.content && renderContent(newsDetail.content)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
