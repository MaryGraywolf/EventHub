import { z } from "zod";

export const registerAttendeeSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z
    .string()
    .min(1, { message: "E-mail é obrigatório" })
    .email({ message: "E-mail deve ter um formato válido" }),
});

export type TRegisterAttendeeSchema = z.infer<typeof registerAttendeeSchema>;
