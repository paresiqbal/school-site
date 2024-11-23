"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Toaster } from "sonner";

import Topbar from "@/components/Topbar";
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
import { useEditNews } from "@/hooks/use-editNews";

export default function EditNews({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { form, handleEdit, imagePreviewUrl, handleImageChange } =
    useEditNews(slug);

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
              <BreadcrumbPage>Edit Berita</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

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
            <form
              onSubmit={form.handleSubmit(handleEdit)}
              className="space-y-4"
            >
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
                name="image"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Gambar</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          onChange(file);
                          handleImageChange(file);
                        }}
                        {...field}
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
                        value={field.value || ""}
                        onChange={(newValue) => field.onChange(newValue)}
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

              <Button type="submit" className="w-full">
                Update Berita
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
