import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AppContext } from "@/context/AppContext";
import { formSchema, type FormData } from "@/lib/article-schemas";

export function useEditAchievement(slug: string) {
  const { token } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined,
  );
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>(
    undefined,
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  });

  useEffect(() => {
    const getAchievementDetail = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ACHIEVEMENT}/${slug}`,
        );
        const data = await res.json();

        if (!res.ok) throw new Error("Failed to fetch achievement data");

        if (data) {
          form.reset({
            title: data.title || "",
            content: data.content || "",
            image: data.image || undefined,
          });
          setSelectedImage(data.image ? new File([], data.image) : undefined);
          setImagePreviewUrl(
            data.image
              ? `${process.env.NEXT_PUBLIC_API_STORAGE}/${data.image}`
              : undefined,
          );
        }

        toast.success("Prestasi siswa berhasil dimuat.");
      } catch (error) {
        console.error(error);
        toast.error("Gagal memuat prestasi siswa.");
      }
    };

    getAchievementDetail();
  }, [slug, form]);

  const handleImageChange = (file: File | undefined) => {
    setSelectedImage(file);
    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setImagePreviewUrl(undefined);
    }
  };

  const handleEdit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);

    if (selectedImage instanceof File) {
      formData.append("image", selectedImage);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ACHIEVEMENT}/${slug}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update achievement.");
      }

      toast.success("Prestasi siswa berhasil diperbarui.");
    } catch (error) {
      console.error(error);
      toast.error("Gagal perbarui prestasi siswa.");
    }
  };

  return {
    form,
    handleEdit,
    selectedImage,
    imagePreviewUrl,
    handleImageChange,
  };
}
