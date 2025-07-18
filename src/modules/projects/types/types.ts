import { z } from 'zod'

import { createProjectSchema } from '../schemas/create-project.schema'

/**
 * Esquema de creación de proyectos basado en Zod.
 */
export type ProjectCreationSchema = z.infer<typeof createProjectSchema>

// Tipos para los trabajadores traidos de la base de datos
/**
 * Representa un trabajador traído de la base de datos.
 */
export interface Worker {
  id: string
  name: string
  curriculum: string
  numberOfJobs: number
}

export interface Team {
  workers: Worker[]
  points: string[]
}

export interface Result {
  technologies: string
  workers: Worker[]
  team: Team
}

/**
 * Estado del reducer de trabajadores.
 */
export interface WorkersReducerState {
  workers: Worker[]
  loading: boolean
  error: string
  selectedWorkers: Worker[]
  resultSuggested: Result | null
}

/**
 * Tipos de acciones para el reducer de trabajadores.
 */
export type ActionPayloadWorkersReducer =
  | { type: 'REMOVE_WORKER'; payload: Worker['id'] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_WORKERS'; payload: Worker[] }
  | { type: 'SELECT_WORKER'; payload: Worker }
  | { type: 'UNSELECTED_WORKER'; payload: Worker }
  | { type: 'SET_RESULT_SUGGESTED'; payload: Result }
