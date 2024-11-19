"use client";

import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
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
import Topbar from "@/components/Topbar";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  image: z.any().optional(),
  tags: z.array(z.string()).nonempty("Please select at least one tag"),
});

interface FormData {
  title: string;
  content: string;
  image?: FileList;
  tags: string[];
}

export default function CreateNews() {
  const { token } = useContext(AppContext);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
      tags: [],
    },
  });

  // Fetch tags from the API
  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/tag`);
        const data = await res.json();
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
        toast.error("Failed to load tags. Please refresh.");
      }
    }
    fetchTags();
  }, [token]);

  async function handleCreate(data: FormData) {
    setServerError(null);
    setIsSubmitting(true);

    if (!token) {
      form.setError("title", {
        type: "server",
        message: "Please login first.",
      });
      toast.error("Silahkan login terlebih dahulu.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("tags", JSON.stringify(data.tags));

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

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
          message: "Unauthorized. Please sign in again.",
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
        form.reset({
          title: "",
          content: "",
          tags: [],
        });
      }
    } catch (error) {
      console.error("Ups there is something wrong:", error);
      setServerError("There is some error please try again.");
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
                <p>Buat Berita</p>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

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
              {/* Title Field */}
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

              {/* Content Field */}
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
                          field.onChange(newValue);
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

              {/* Tags Field */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <MultiSelector
                        values={field.value}
                        onValuesChange={field.onChange}
                        className="max-w-xs"
                      >
                        <MultiSelectorTrigger>
                          <MultiSelectorInput placeholder="Select tags" />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {tags.map((tag) => (
                              <MultiSelectorItem
                                key={tag.id}
                                value={tag.id.toString()}
                              >
                                {tag.name}
                              </MultiSelectorItem>
                            ))}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
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
