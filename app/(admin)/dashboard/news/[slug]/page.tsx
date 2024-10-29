"use client";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

interface NewsDetail {
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

export default function EditNews(props: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null);
  const { token } = useContext(AppContext);
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);

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
  }, [slug]); // only runs when slug changes

  if (!slug) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>My Post: {slug}</h2>
    </div>
  );
}
