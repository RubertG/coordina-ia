/**
 * Este archivo define los esquemas de validación para el registro y login de usuarios.
 * Utiliza la biblioteca Zod para la validación de datos.
 */

import { z } from 'zod'

/**
 * Esquema de validación para el login de usuarios.
 * Valida que el correo electrónico sea válido y que la contraseña tenga al menos 6 caracteres.
 */
export const loginSchema = z.object({
  email: z.string().email({
    message: 'El correo electrónico no es válido.',
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  }),
})
