import { z } from "zod"
import { createProjectSchema } from "../schemas/create-project.schema"

export type createProjectSchemaType = z.infer<typeof createProjectSchema>
