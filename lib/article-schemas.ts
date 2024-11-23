import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, { message: "Judul harus minimal 6 karakter." }),
  content: z.string().min(10, { message: "Konten harus minimal 10 karakter." }),
  image: z.any().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export const agendaSchema = z.object({
  title: z.string().min(6, { message: "Judul minimal 6 karakter." }),
  description: z
    .string()
    .min(10, { message: "Deskripsi minimal 10 karekter." }),
});

export type AgendaFormData = z.infer<typeof agendaSchema>;
