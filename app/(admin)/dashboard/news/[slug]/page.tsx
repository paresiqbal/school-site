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

// Validation schema using zod
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  image: z.string().optional(), // Optional image field for existing image
});

interface NewsDetail {
  title: string;
  content: string;
  image?: string; // Optional image field for displaying the existing image
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
      image: "", // Initialize as an empty string
    },
  });

  // Fetch the existing news details
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
        form.setValue("image", data.image); // Set the image if exists
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

  // Handle the form submission to update news
  const handleUpdate = async (data: NewsDetail) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/news/${params.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
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

  // Loading state
  if (isLoading && !newsDetail) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Toggle editing mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="container mx-auto">
      <Toaster />
      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)}>
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
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Optional new image URL"
                      {...field}
                      className="w-full rounded-lg"
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
          </form>
        </Form>
      ) : (
        <div>
          <h1>{newsDetail?.title}</h1>
          <p>{newsDetail?.content}</p>
          {newsDetail?.image && (
            <Image
              src={`http://localhost:8000/${newsDetail.image}`}
              width={500}
              height={300}
              alt="News"
            />
          )}
          <Button className="mt-4" onClick={toggleEditMode}>
            Edit News
          </Button>
        </div>
      )}
    </div>
  );
}
