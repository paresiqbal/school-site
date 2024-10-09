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

type DetailAnnouncementProps = { params: { slug: string } };

interface AnnouncementDetail {
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

export default function EditAnnouncement({ params }: DetailAnnouncementProps) {
  const { token } = useContext(AppContext);
  const [announcementDetail, setAnnouncementDetail] =
    useState<AnnouncementDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
  });

  useEffect(() => {
    async function fetchAnnouncementDetail() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/announcement/${params.slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch announcement details.");
        }

        const data = await res.json();
        setAnnouncementDetail(data);
        form.setValue("title", data.title);
        form.setValue("content", data.content);
        toast.success("Announcement loaded successfully");
      } catch (error) {
        console.error(error);
        setError("Failed to load announcement details. Please try again.");
        toast.error("Failed to load announcement details.");
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncementDetail();
  }, [params.slug, token, form]);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setSelectedImage(event.target.files[0]);
  //   }
  // };

  const handleSave = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/announcement/${announcementDetail?.id}`,
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
        throw new Error("Failed to update announcement.");
      }

      const updatedAnnouncement = await res.json();
      setAnnouncementDetail(updatedAnnouncement);
      toast.success("Announcement updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update announcement.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin" size={48} />
      </div>
    );

  if (error) return <p className="text-red-600 text-center mt-4">{error}</p>;

  if (!announcementDetail)
    return <p className="text-center mt-4">Announcement not found.</p>;

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
            <BreadcrumbPage>
              <Link
                href="/dashboard/announcement"
                className="text-zinc-300 hover:text-foreground"
              >
                List Announcement
              </Link>
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Announcement</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Edit form */}
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Edit Announcement</CardTitle>
          <CardDescription>
            Change this form to update the announcement.
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
                      <Input placeholder="Announcement title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {announcementDetail.image && (
                <div className="w-full py-6">
                  <Image
                    src={`http://localhost:8000/${announcementDetail.image}`}
                    alt={announcementDetail.title}
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
                        rows={12}
                        placeholder="Announcement content"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <div className="relative">
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
              )} */}
              <Button
                type="submit"
                className="font-bold w-full p-2 rounded mt-4"
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
