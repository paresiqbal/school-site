"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppContext } from "@/context/AppContext";

// UI library imports
import { Toaster, toast } from "sonner";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Icons
import { Loader } from "lucide-react";

// Zod for validation
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type DetailNewsProps = { params: { slug: string } };

interface NewsDetail {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  image: z.any().optional(),
});

export default function EditNews({ params }: DetailNewsProps) {
  const { token } = useContext(AppContext);
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
  });

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
        form.setValue("title", data.title);
        form.setValue("content", data.content);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSave = async (data: z.infer<typeof formSchema>) => {
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
            title: data.title,
            content: data.content,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update news.");
      }

      const updatedNews = await res.json();
      setNewsDetail(updatedNews);
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
            <BreadcrumbPage>Edit News</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Toaster />

      <Card className="mb-6 p-4">
        <CardHeader>
          <CardTitle>Edit News</CardTitle>
          <CardDescription>
            Change this form to update the news.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="News title"
                        {...field}
                        className="w-full rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {newsDetail.image && (
                <div className="w-full mb-4">
                  <Image
                    src={`http://localhost:8000/${newsDetail.image}`}
                    alt={newsDetail.title}
                    width={600}
                    height={400}
                    className="rounded-lg h-auto object-cover"
                  />
                </div>
              )}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="News content"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="relative">
                <label
                  htmlFor="fileInput"
                  className="absolute left-4 bottom-4 cursor-pointer"
                >
                  <span className="text-gray-500">Attach Image</span>
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              {selectedImage && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected file: {selectedImage.name}
                </p>
              )}
              <Button
                type="submit"
                className="font-bold w-full p-2 rounded mt-4"
              >
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
