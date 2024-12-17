/**
 * Este archivo define los tipos utilizados en el módulo de autenticación.
 * Utiliza la biblioteca Zod para inferir los tipos a partir de los esquemas de validación.
 */

import { z } from 'zod'

import { loginSchema } from '../schemas/register'

/**
 * Tipo inferido a partir del esquema de validación de login.
 */
export type registerSchemaType = z.infer<typeof loginSchema>
