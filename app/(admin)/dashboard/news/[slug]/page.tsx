"use client";

import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

// lib
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ui lib
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Toaster, toast } from "sonner";
import { AppContext } from "@/context/AppContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// icons
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

interface NewsDetail {
  title: string;
  content: string;
}

type DetailNewsProps = { params: { slug: string } };

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
});

export default function DetailNews(props: DetailNewsProps) {
  const { params } = props;
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useContext(AppContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
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
        form.setValue("title", data.title);
        form.setValue("content", data.content);
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
  }, [params.slug, form]);

  const handleUpdate = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/news/${params.slug}`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Failed to update news: ${res.statusText}`);
      }

      const updatedNews = await res.json();
      setNewsDetail(updatedNews);
      toast.success("News updated successfully.");
      setIsEditing(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      toast.error("Failed to update the news. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !newsDetail) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
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
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)}>
              <CardHeader>
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
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={6}
                          placeholder="News content"
                          {...field}
                          className="w-full p-2 border rounded bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-4" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update News"}
                </Button>
                <Button
                  type="button"
                  className="mt-4 ml-2"
                  variant="outline"
                  onClick={toggleEditMode}
                >
                  Cancel
                </Button>
              </CardContent>
            </form>
          </Form>
        ) : (
          <div>
            <CardHeader>
              <CardTitle className="text-2xl">{newsDetail?.title}</CardTitle>
              <CardDescription>9 September 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {newsDetail?.content.split("\n").map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
              <div className="pt-8 flex gap-2">
                <Button
                  className="flex items-center gap-2"
                  onClick={toggleEditMode}
                >
                  Edit
                  <span>
                    <Pencil className="h-4 w-4" />
                  </span>
                </Button>
                <Button className="bg-destructive text-white">
                  Delete
                  <span>
                    <Trash2 className="h-4 w-4" />
                  </span>
                </Button>
              </div>
            </CardContent>
          </div>
        )}
      </Card>
    </div>
  );
}
