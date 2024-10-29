"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// components
import Topbar from "@/components/Topbar";

// external libraries
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";

// UI library components
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
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Icon
import { Paperclip } from "lucide-react";

// Validation schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  image: z.any().optional(),
});

export default function EditNews(props: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    null,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
  });

  useEffect(() => {
    const fetchParams = async () => {
      const params = await props.params;
      setSlug(params.slug);
    };

    fetchParams();
  }, [props.params]);

  useEffect(() => {
    if (!slug) return;

    const getNewsDetail = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/news/${slug}`);
        const data = await res.json();

        if (!res.ok) throw new Error("Failed to fetch news data");

        form.setValue("title", data.title);
        form.setValue("content", data.content);
        form.setValue("image", data.image);
        setSelectedImage(data.image);
        toast.success("News loaded successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to load news");
      }
    };

    getNewsDetail();
  }, [slug, form.setValue, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const imagePreviewUrl =
    selectedImage instanceof File
      ? URL.createObjectURL(selectedImage)
      : `http://127.0.0.1:8000/storage/${selectedImage}`;

  if (!slug) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between pb-4">
        <div className="flex">
          <Topbar />
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard/news">Daftar Berita</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>
                <p>Edit Berita</p>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Form for editing news */}
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Edit Berita</CardTitle>
          <CardDescription>
            Ubah informasi berita melalui formulir ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => console.log(data))}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Judul berita"
                        {...field}
                        className="w-full rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {imagePreviewUrl && (
                <div className="my-4">
                  <Image
                    src={imagePreviewUrl}
                    alt="Selected"
                    width={400}
                    height={200}
                    priority
                    className="h-auto w-full rounded-lg"
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konten</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Textarea
                          rows={10}
                          placeholder="Konten berita"
                          {...field}
                          className="w-full rounded border bg-background p-2"
                        />
                      </FormControl>

                      <label
                        htmlFor="fileInput"
                        className="absolute bottom-4 right-4 cursor-pointer"
                      >
                        <Paperclip className="text-primary" />
                      </label>
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-4 w-full rounded p-2 font-bold"
              >
                Update Berita
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
