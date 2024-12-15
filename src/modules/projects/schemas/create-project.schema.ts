import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre debe tener al menos 3 caracteres.',
  }),
  description: z.string().min(10, {
    message: 'La descripción debe tener al menos 10 caracteres.',
  }),
  technologies: z
    .string()
    .min(1, {
      message: 'Campo requerido.',
    })
    .refine((value) => value.split(',').length > 1, {
      message: 'Debe seleccionar al menos 2 tecnologías.',
    }),
  maxWorkers: z
    .string()
    .min(1, {
      message: 'El número de trabajadores debe ser mayor a 0.',
    })
    .refine((value) => parseInt(value) > 0, {
      message: 'El número de trabajadores debe ser mayor a 0.',
    }),
})
