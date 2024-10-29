"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

// components
import Topbar from "@/components/Topbar";

// ex lib
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// ui lib
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  image: z.any().optional(),
});

export default function EditNews(props: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
  });

  // get slug asynchronously
  useEffect(() => {
    const fetchParams = async () => {
      const params = await props.params;
      setSlug(params.slug);
    };

    fetchParams();
  }, [props.params]);

  // fetch news detail after slug is set
  useEffect(() => {
    if (!slug) return;

    async function getNewsDetail() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/news/${slug}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error("Failed to fetch news data");
        }

        form.setValue("title", data.title);
        form.setValue("content", data.content);
        form.setValue("image", data.image);
        toast.success("News loaded successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to load news");
      }
    }

    getNewsDetail();
  }, [slug]);

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
                <p>Edit Berita</p>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
}
