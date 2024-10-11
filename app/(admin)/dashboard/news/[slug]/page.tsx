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
          },
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
  }, [params.slug, token, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSave = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/news/${newsDetail?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
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
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="animate-spin" size={48} />
      </div>
    );

  if (error) return <p className="mt-4 text-center text-red-600">{error}</p>;

  if (!newsDetail) return <p className="mt-4 text-center">News not found.</p>;

  return (
    <div className="container mx-auto">
      <Breadcrumb className="hidden pb-4 md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Link
                href="/dashboard/news"
                className="text-zinc-300 hover:text-foreground"
              >
                List News
              </Link>
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit News</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Edit form */}
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Edit News</CardTitle>
          <CardDescription>
            Change this form to update the news.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="News title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {newsDetail.image && (
                <div className="w-full py-6">
                  <Image
                    src={`http://localhost:8000/storage/${newsDetail.image}`}
                    alt={newsDetail.title}
                    width={600}
                    height={400}
                    className="h-auto rounded-lg object-cover"
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
                        rows={12}
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
                  className="absolute bottom-4 left-4 cursor-pointer"
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
                className="mt-4 w-full rounded p-2 font-bold"
              >
                Save Update
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
