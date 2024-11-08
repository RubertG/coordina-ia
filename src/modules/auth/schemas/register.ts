import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres."
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres."
  })
})