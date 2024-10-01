"use client";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

// Validation schema using zod
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  image: z.any().optional(), // Allow file upload
});

interface NewsDetail {
  title: string;
  content: string;
  image?: string;
}

type DetailNewsProps = { params: { slug: string } };

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
      image: null,
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
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await fetch(`http://127.0.0.1:8000/api/news/${params.slug}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  if (isLoading && !newsDetail) {
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
      <Toaster />
      <Card>
        {isEditing ? (
          <div>
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
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardHeader>
                <CardContent>
                  {newsDetail?.image && (
                    <div>
                      <Image
                        src={`http://localhost:8000/${newsDetail.image}`}
                        width={500}
                        height={300}
                        alt="News"
                      />
                      <p>Current Image</p>
                    </div>
                  )}
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload New Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => field.onChange(e.target.files)}
                            className="w-full rounded-lg"
                            accept="image/*"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                            value={field.value ?? ""}
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
          </div>
        ) : (
          <div>
            <CardHeader>
              <CardTitle className="text-2xl">{newsDetail?.title}</CardTitle>
              <CardDescription>9 September 2024</CardDescription>
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
