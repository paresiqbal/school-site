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
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";

// Validation schema
const formSchema = z.object({
  title: z.string().min(6, { message: "Judul minimal 6 karakter." }),
  content: z.string().min(10, { message: "Konten minimal 10 karakter." }),
  image: z.any().optional(),
});

export default function EditAnnouncement(props: {
  params: Promise<{ slug: string }>;
}) {
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

    const getAnnouncementDetail = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ANNOUNCEMENT}/${slug}`,
        );
        const data = await res.json();

        if (!res.ok) throw new Error("Failed to fetch announcement data");

        // Only update state when it's safe to do so
        if (data) {
          form.setValue("title", data.title);
          form.setValue("content", data.content); // Sets initial content
          form.setValue("image", data.image);
          setSelectedImage(data.image);
        }

        toast.success("Pengumuman berhasil dimuat.");
      } catch (error) {
        console.error(error);
        toast.error("Gagal memuat pengumuman.");
      }
    };

    getAnnouncementDetail();
  }, [slug, form]);

  const imagePreviewUrl =
    selectedImage instanceof File
      ? URL.createObjectURL(selectedImage)
      : selectedImage
        ? `${process.env.NEXT_PUBLIC_API_STORAGE}/${selectedImage}`
        : null;

  const handleEdit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);

    if (selectedImage instanceof File) {
      formData.append("image", selectedImage);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ANNOUNCEMENT}/${slug}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update announcement.");
      }

      toast.success("Pengumuman berhasil diperbarui.");
    } catch (error) {
      console.error(error);
      toast.error("Gagal perbarui pengumuman.");
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
                  <Link href="/dashboard/announcement">Daftar Pengumuman</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>
                <p>Edit Pengumuman</p>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Form for editing announcement */}
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Edit Pengumuman</CardTitle>
          <CardDescription>
            Ubah informasi pengumuman melalui formulir ini.
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
                        placeholder="Judul pengumuman"
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
                    <FormControl>
                      <MinimalTiptapEditor
                        value={field.value || ""}
                        onChange={(newValue) => {
                          Promise.resolve().then(() =>
                            field.onChange(newValue),
                          );
                        }}
                        className="w-full"
                        editorContentClassName="p-5"
                        output="html"
                        placeholder="Type your description here..."
                        autofocus={true}
                        editable={true}
                        editorClassName="focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-4 w-full rounded p-2 font-bold"
              >
                Update Pengumuman
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
