"use client";

import { Paperclip } from "lucide-react";
import { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Toaster, toast } from "sonner";
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
import Link from "next/link";

// Validation schema for title, content, and optional image
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]); // Store the selected image
    }
  };

  async function handleCreate(data: FormData) {
    setServerError(null);
    setIsSubmitting(true);

    if (!token) {
      form.setError("title", {
        type: "server",
        message: "Authentication token is missing. Please log in.",
      });
      toast.error("Authentication token is missing. Please log in.");
      setIsSubmitting(false);
      return;
    }

    // Create FormData to include image
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);

    if (selectedImage) {
      formData.append("image", selectedImage); // Add image to FormData
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/news", {
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
          message: "Unauthorized. Please log in again.",
        });
        toast.error("Unauthorized. Please log in again.");
        return;
      }

      if (result.errors) {
        Object.keys(result.errors).forEach((key) => {
          form.setError(key as keyof FormData, {
            type: "server",
            message: result.errors[key][0],
          });
        });
        toast.error("Error creating news. Please check the form.");
      } else {
        toast.success("News created successfully.");
        form.reset();
      }
    } catch (error) {
      console.error("Error creating news:", error);
      setServerError("Network error. Please try again later.");
      toast.error("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

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
            <BreadcrumbPage>Create News</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Form create news */}
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Create News</CardTitle>
          <CardDescription>Fill this form to create a news.</CardDescription>
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
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="News title"
                        {...field}
                        className="w-full rounded-lg"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Content Field with Paperclip Icon in the Bottom Left */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Textarea
                          rows={6}
                          placeholder="News content"
                          {...field}
                          className="w-full p-2 border rounded bg-background"
                          disabled={isSubmitting}
                        />
                      </FormControl>

                      {/* Paperclip Icon in Bottom Left Corner */}
                      <label
                        htmlFor="fileInput"
                        className="absolute left-4 bottom-4 cursor-pointer"
                      >
                        <Paperclip className="text-gray-500" />
                      </label>
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        className="hidden" // Hide default input
                        onChange={handleFileChange} // Capture the selected image
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Display selected image name (optional) */}
              {selectedImage && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected file: {selectedImage.name}
                </p>
              )}

              {serverError && <p className="text-destructive">{serverError}</p>}
              <Button
                type="submit"
                className="font-bold w-full p-2 rounded mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create News"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
