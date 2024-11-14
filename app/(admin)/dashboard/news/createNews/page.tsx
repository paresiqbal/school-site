"use client";

import Link from "next/link";
import { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useForm } from "react-hook-form";

// ex lib
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import { Content } from "@tiptap/react";

// ui lib
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

// icons
import Topbar from "@/components/Topbar";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";

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

export default function CreateNews() {
  const { token } = useContext(AppContext);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [value, setValue] = useState<Content>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
  });

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

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_NEWS}`, {
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
          "Terjadi kesalahan saat membuat berita. Harap periksa formulir.",
        );
      } else {
        toast.success("Berita berhasil dibuat.");
        form.reset();
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat membuat berita:", error);
      setServerError("Terjadi kesalahan jaringan. Silakan coba lagi nanti.");
      toast.error("Terjadi kesalahan jaringan. Silakan coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto">
      <div>
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
                  <Link href="/dashboard/news">Daftar Berita</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>
                <p>Buat Berita</p>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Form create news */}
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Buat Berita</CardTitle>
          <CardDescription>
            Isi formulir ini untuk membuat berita.
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
                        placeholder="Judul berita"
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
                    <FormControl>
                      <MinimalTiptapEditor
                        value={value}
                        onChange={(content) => {
                          setValue(content);
                          field.onChange(content);
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
              {serverError && <p className="text-destructive">{serverError}</p>}
              <Button
                type="submit"
                className="mt-4 w-full rounded p-2 font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Membuat..." : "Buat Berita"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
