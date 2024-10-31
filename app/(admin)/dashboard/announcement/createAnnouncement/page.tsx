"use client";

import Link from "next/link";
import { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useForm } from "react-hook-form";

// ex lib
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";

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

// icons
import { Paperclip } from "lucide-react";
import Topbar from "@/components/Topbar";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  image: z.any().optional(),
});

interface FormData {
  title: string;
  content: string;
  image?: FileList;
}

export default function CreateAnnouncement() {
  const { token } = useContext(AppContext);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  async function handleCreate(data: FormData) {
    setServerError(null);
    setIsSubmitting(true);

    if (!token) {
      form.setError("title", {
        type: "server",
        message: "Silahkan login terlebih dahulu.",
      });
      toast.error("Silahkan login terlebih dahulu.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ANNOUNCEMENT}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();

      if (res.status === 401) {
        form.setError("title", {
          type: "server",
          message: "Unauthorized. Silakan masuk lagi.",
        });
        toast.error("Unauthorized. Silakan masuk lagi.");
        return;
      }

      if (result.errors) {
        Object.keys(result.errors).forEach((key) => {
          form.setError(key as keyof FormData, {
            type: "server",
            message: result.errors[key][0],
          });
        });
        toast.error(
          "Terjadi kesalahan saat membuat pengumuman. Harap periksa formulir.",
        );
      } else {
        toast.success("Pengumuman berhasil dibuat.");
        form.reset();
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat membuat pengumuman:", error);
      setServerError("Terjadi kesalahan jaringan. Silakan coba lagi nanti.");
      toast.error("Terjadi kesalahan jaringan. Silakan coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
    }
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
                  <Link href="/dasboard">Dashboard</Link>
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
                <p>Buat Pengumuman</p>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Form create announcement */}
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Buat Pengumuman</CardTitle>
          <CardDescription>
            Isi formulir ini untuk membuat pengumuman.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreate)}>
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
                        disabled={isSubmitting}
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
                    <FormLabel>Konten</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Textarea
                          rows={10}
                          placeholder="Konten pengumuman"
                          {...field}
                          className="w-full rounded border bg-background p-2"
                          disabled={isSubmitting}
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
              {selectedImage && (
                <p className="mt-2 text-sm text-primary underline">
                  Selected image: {selectedImage.name}
                </p>
              )}
              {serverError && <p className="text-destructive">{serverError}</p>}
              <Button
                type="submit"
                className="mt-4 w-full rounded p-2 font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Membuat..." : "Buat Pengumuman"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
