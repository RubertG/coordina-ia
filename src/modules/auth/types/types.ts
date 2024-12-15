import { z } from 'zod'

import { loginSchema } from '../schemas/register'

export type registerSchemaType = z.infer<typeof loginSchema>
