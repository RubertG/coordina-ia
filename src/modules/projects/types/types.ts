import { z } from 'zod'

import { createProjectSchema } from '../schemas/create-project.schema'

export type ProjectCreationSchema = z.infer<typeof createProjectSchema>

// Tipos para los trabajadores traidos de la base de datos
export interface Worker {
  id: string
  name: string
  numberOfJobs: number
}

export interface SelectedWorker extends Worker {
  isSelected?: boolean
}

export interface WorkersReducerState {
  workers: SelectedWorker[]
  loading: boolean
  error: string
}

export type ActionPayloadWorkersReducer =
  | { type: 'SELECT_WORKER'; payload: SelectedWorker['id'] }
  | { type: 'REMOVE_WORKER'; payload: SelectedWorker['id'] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_WORKERS'; payload: SelectedWorker[] }
