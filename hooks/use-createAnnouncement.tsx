import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

// components
import { AppContext } from "@/context/AppContext";
import { formSchema, type FormData } from "@/lib/article-schemas";

// ex lib
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

export function useCreateAnnouncement() {
  const { token } = useContext(AppContext);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  });

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

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ANNOUNCEMENT}`, {
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
          "Terjadi kesalahan saat membuat pengumuman. Harap periksa formulir.",
        );
      } else {
        toast.success("Pengumuman berhasil dibuat.");
        form.reset({
          title: "",
          content: "",
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

  return { handleCreate, isSubmitting, serverError, form };
}
