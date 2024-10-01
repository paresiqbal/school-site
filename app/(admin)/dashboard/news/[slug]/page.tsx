"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppContext } from "@/context/AppContext";

// ui lib
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster, toast } from "sonner";

// icons
import { Loader } from "lucide-react";

type DetailNewsProps = { params: { slug: string } };

interface NewsDetail {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

export default function DetailNews({ params }: DetailNewsProps) {
  const { token } = useContext(AppContext);
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    async function fetchNewsDetail() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/news/${params.slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch news details.");
        }

        const data = await res.json();
        setNewsDetail(data);
        setEditedTitle(data.title);
        setEditedContent(data.content);
        toast.success("News loaded successfully");
      } catch (error) {
        console.error(error);
        setError("Failed to load news details. Please try again.");
        toast.error("Failed to load news details.");
      } finally {
        setLoading(false);
      }
    }

    fetchNewsDetail();
  }, [params.slug, token]);

  const formatDate = (dateString?: string | null): string => {
    if (!dateString) return "Date not available";

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/news/${newsDetail?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editedTitle,
            content: editedContent,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update news.");
      }

      const updatedNews = await res.json();
      setNewsDetail(updatedNews);
      setIsEditing(false);
      toast.success("News updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update news.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin" size={48} />
      </div>
    );

  if (error) return <p className="text-red-600 text-center mt-4">{error}</p>;

  if (!newsDetail) return <p className="text-center mt-4">News not found.</p>;

  return (
    <div className="container mx-auto px-4">
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

      <Card className="mb-6 p-4">
        <CardHeader>
          {isEditing ? (
            <form onSubmit={handleSave}>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-2xl md:text-3xl w-full mb-2"
              />
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={5}
                className="w-full mb-4"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleEditToggle}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <CardTitle className="text-2xl md:text-3xl">
                {newsDetail.title}
              </CardTitle>
              <CardDescription>
                {formatDate(newsDetail.created_at)}
              </CardDescription>
              <button
                onClick={handleEditToggle}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            </>
          )}
        </CardHeader>
        <CardContent className="mt-4">
          {newsDetail.image && (
            <div className="w-full mb-6">
              <Image
                src={`http://localhost:8000/${newsDetail.image}`}
                alt={newsDetail.title}
                width={600}
                height={400}
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          )}
          <div
            className="text-base md:text-lg"
            dangerouslySetInnerHTML={{
              __html: isEditing
                ? editedContent.replace(/\n/g, "<br />")
                : newsDetail.content.replace(/\n/g, "<br />"),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
