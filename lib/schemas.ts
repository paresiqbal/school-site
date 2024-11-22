import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, { message: "Judul harus minimal 6 karakter." }),
  content: z.string().min(10, { message: "Konten harus minimal 10 karakter." }),
  image: z.any().optional(),
});

export type FormData = z.infer<typeof formSchema>;
