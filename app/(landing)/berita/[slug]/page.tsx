"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// external libraries
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";

// Validation schema
const formSchema = z.object({
  title: z.string().min(6, { message: "Judul minimal 6 karakter." }),
  content: z.string().min(10, { message: "Konten minimal 10 karakter." }),
  image: z.any().optional(),
});

export default function Page(props: { params: Promise<{ slug: string }> }) {
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

  const imagePreviewUrl =
    selectedImage instanceof File
      ? URL.createObjectURL(selectedImage)
      : selectedImage
        ? `http://127.0.0.1:8000/storage/${selectedImage}`
        : null;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Toaster />

      {imagePreviewUrl && (
        <div className="mb-6 w-full rounded-md">
          <Image
            src={imagePreviewUrl}
            alt="Selected"
            width={500}
            height={500}
            priority
            className="h-auto w-full rounded-lg"
          />
        </div>
      )}

      <h1 className="mb-4 text-3xl font-bold">
        How to convert CommonJS to ESM
      </h1>

      <div className="mb-4 flex items-center space-x-2 text-gray-500">
        <span className="text-sm">October 16, 2024</span>
        <span>•</span>
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-gray-300"></div>
          <span>Andy Jiang</span>
        </div>
      </div>

      <span className="mb-4 inline-block rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-600">
        How To
      </span>

      <hr className="my-4 border-t border-gray-300" />

      <div className="space-y-4 leading-relaxed text-gray-800">
        <p>
          ECMAScript modules () are the official, modern way of writing and
          sharing JavaScript — its supported in many environments (e.g.,
          browsers, the edge, and modern runtimes like Deno) and offers a better
          development experience (e.g., async loading and being able to export
          without globals).
        </p>
        <p>
          While CommonJS was the standard for many years, supporting CommonJS
          today is hurting the JavaScript community.
        </p>
      </div>

      <div className="mt-8 text-gray-500">
        <p>Post Slug: {slug}</p>
      </div>
    </div>
  );
}
