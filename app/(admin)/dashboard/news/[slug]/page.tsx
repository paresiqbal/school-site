"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// components
import Topbar from "@/components/Topbar";
import { AppContext } from "@/context/AppContext";

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
  title: z.string().min(6, { message: "Judul minimal 6 karakter." }),
  content: z.string().min(10, { message: "Konten minimal 10 karakter." }),
  image: z.any().optional(),
});

export default function EditNews(props: { params: Promise<{ slug: string }> }) {
  const { token } = useContext(AppContext);
  const [slug, setSlug] = useState<string | null>(null);
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
        toast.success("Berita berhasil dimuat.");
      } catch (error) {
        console.error(error);
        toast.error("Gagal memuat berita.");
      }
    };

    getNewsDetail();
  }, [slug, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const imagePreviewUrl =
    selectedImage instanceof File
      ? URL.createObjectURL(selectedImage)
      : selectedImage
        ? `http://127.0.0.1:8000/storage/${selectedImage}`
        : null;

  const handleEdit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);

    if (selectedImage instanceof File) {
      formData.append("image", selectedImage);
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/news/${slug}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to update news.");
      }

      toast.success("Berita berhasil diperbarui.");
    } catch (error) {
      console.error(error);
      toast.error("Gagal perbarui berita.");
    }
  };

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
            <form onSubmit={form.handleSubmit(handleEdit)}>
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
                    width={500}
                    height={500}
                    priority
                    className="h-auto w-1/2 rounded-lg"
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
