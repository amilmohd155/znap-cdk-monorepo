import { z } from "zod";

export const formSchema = z.object({
  url: z.string().trim().url({ message: "URL doesn't seem to be valid" }),
});

export type FormSchema = z.infer<typeof formSchema>;
