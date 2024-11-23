"use client";

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
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { useEffect } from "react";
import { useCreateNews } from "@/hooks/use-createNews";

export function CreateNewsForm() {
  const { handleCreate, isSubmitting, serverError, form, resetForm } =
    useCreateNews();

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul</FormLabel>
              <FormControl>
                <Input placeholder="Judul pengumuman" {...field} />
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
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Isi pengumuman"
                  className="w-full"
                  editorContentClassName="p-4"
                  output="html"
                  autofocus={true}
                  editable={true}
                  editorClassName="focus:outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {serverError && <p className="text-red-500">{serverError}</p>}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Membuat..." : "Buat Pengumuman"}
        </Button>
      </form>
    </Form>
  );
}
