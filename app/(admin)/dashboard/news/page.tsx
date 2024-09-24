"use client";

import { AppContext } from "@/context/AppContext";
import { useContext, useState } from "react";

// lib
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ui lib
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormData {
  title: string;
  content: string;
}

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
});

export default function CreateNews() {
  const { token } = useContext(AppContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function handleCreate(data: FormData) {
    setServerError(null);
    setSuccessMessage("");

    if (!token) {
      form.setError("title", {
        type: "server",
        message: "Authentication token is missing. Please log in.",
      });
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.status === 401) {
        form.setError("title", {
          type: "server",
          message: "Unauthorized. Please log in again.",
        });
        return;
      }

      if (result.errors) {
        Object.keys(result.errors).forEach((key) => {
          form.setError(key as keyof FormData, {
            type: "server",
            message: result.errors[key][0],
          });
        });
      } else {
        setSuccessMessage("News created successfully.");
        form.reset();
      }
    } catch (error) {
      console.error("Error creating news:", error);
      setServerError("Network error. Please try again later.");
    }
  }

  return (
    <div className="container mx-auto">
      <Breadcrumb className="hidden md:flex pb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href={"/dashboard"} className="hover:text-white font-bold">
              Dashboard
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold text-white/70 hover:text-white">
              News
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {successMessage && (
        <p className="text-green-600 mb-4">{successMessage}</p>
      )}
      {serverError && <p className="text-red-600 mb-4">{serverError}</p>}

      <Card className="bg-background text-white">
        <CardHeader>
          <CardTitle>Create News</CardTitle>
          <CardDescription>Fill this form to create a news.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreate)}
              className="p-4 shadow-md"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter news title"
                        {...field}
                        className="w-full p-2 rounded"
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
                    <FormLabel className="font-bold">Content</FormLabel>
                    <FormControl>
                      <textarea
                        rows={6}
                        placeholder="Enter news content"
                        {...field}
                        className="w-full p-2 border rounded bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Server errors */}
              {serverError && <p className="text-red-600">{serverError}</p>}

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
