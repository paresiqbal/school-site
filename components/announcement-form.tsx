import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { formSchema, FormData } from "@/lib/schemas";

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

interface CreateAnnouncementFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
  serverError: string | null;
}

export function CreateAnnouncementForm({
  onSubmit,
  isSubmitting,
  serverError,
}: CreateAnnouncementFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
  );
}
