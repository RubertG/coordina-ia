import { z } from 'zod'

/**
 * Esquema de validación para la creación de proyectos.
 */
export const createWorkerSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  curriculum: z.string().min(1, 'El curriculum es requerida'),
})
