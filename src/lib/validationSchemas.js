import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail.")
    .email("Informe um e-mail válido.")
    .transform((value) => value.toLowerCase()),
  password: z.string().min(1, "Informe sua senha."),
});

export const inviteUserSchema = z.object({
  nomeCompleto: z
    .string()
    .trim()
    .min(3, "Informe o nome completo.")
    .max(255, "O nome deve ter no máximo 255 caracteres."),
  email: z
    .string()
    .trim()
    .min(1, "Informe o e-mail.")
    .email("Informe um e-mail válido.")
    .transform((value) => value.toLowerCase()),
  papel: z.enum(["rh", "colaborador"], {
    message: "Selecione um papel válido.",
  }),
});

export const firstAccessSchema = z
  .object({
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres."),
    confirmPassword: z.string().min(1, "Confirme sua senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });
