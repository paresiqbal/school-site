import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { AppContext } from "@/context/AppContext";
import { agendaSchema, AgendaFormData } from "@/lib/article-schemas";

export function useCreateAgenda() {
  const { token } = useContext(AppContext);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  });

  const form = useForm<AgendaFormData>({
    resolver: zodResolver(agendaSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function handleCreate(data: AgendaFormData) {
    setServerError(null);
    setIsSubmitting(true);

    if (!token) {
      form.setError("title", {
        type: "server",
        message: "Authentication token is missing. Please log in.",
      });
      toast.error("Silahkan login terlebih dahulu.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (date?.from) {
      formData.append("start_date", format(date.from, "dd-MM-yyyy"));
    }
    if (date?.to) {
      formData.append("end_date", format(date.to, "dd-MM-yyyy"));
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_AGENDA}`, {
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
        toast.error("Unauthorized. Silahkan login terlebih dahulu..");
        return;
      }

      if (result.errors) {
        Object.keys(result.errors).forEach((key) => {
          form.setError(key as keyof AgendaFormData, {
            type: "server",
            message: result.errors[key][0],
          });
        });
        toast.error("Kesalahan dalam membuat agenda.");
      } else {
        toast.success("Agenda berhasil dibuat.");
        form.reset();
        setDate({
          from: new Date(),
          to: new Date(new Date().setDate(new Date().getDate() + 7)),
        });
      }
    } catch (error) {
      console.error("Error creating agenda:", error);
      setServerError("Network error. Please try again later.");
      toast.error("Network error. Coba lagi nanti");
    } finally {
      setIsSubmitting(false);
    }
  }

  return { form, handleCreate, date, setDate, isSubmitting, serverError };
}
