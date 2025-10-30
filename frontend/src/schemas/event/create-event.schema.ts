import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  details: z.string().min(1, { message: "Detalhes são obrigatórios" }),
  maximunAttendees: z
    .number({ message: "Máximo de participantes deve ser um número válido" })
    .int({ message: "Máximo de participantes deve ser um número inteiro" })
    .min(1, { message: "Máximo de participantes deve ser pelo menos 1" }),
});

export type TCreateEventSchema = z.infer<typeof createEventSchema>;
