import { ActionPayloadWorkersReducer, WorkersReducerState } from '../types/types'

/**
 * Reducer para gestionar el estado de los trabajadores.
 * @param state - Estado actual del reducer.
 * @param action - Acción a procesar.
 * @returns El nuevo estado del reducer.
 */
export const workersReducer = (state: WorkersReducerState, action: ActionPayloadWorkersReducer) => {
  if (action.type === 'SET_WORKERS') {
    return {
      ...state,
      workers: action.payload,
    }
  }

  if (action.type === 'REMOVE_WORKER') {
    return {
      ...state,
      workers: state.workers.filter((worker) => worker.id !== action.payload),
    }
  }

  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.payload,
    }
  }

  if (action.type === 'SET_ERROR') {
    return {
      ...state,
      error: action.payload,
    }
  }

  if (action.type === 'SELECT_WORKER') {
    const index = state.selectedWorkers.findIndex((worker) => worker.id === action.payload.id)

    if (index === -1) {
      return {
        ...state,
        selectedWorkers: [...state.selectedWorkers, action.payload],
      }
    } else {
      return {
        ...state,
        selectedWorkers: state.selectedWorkers.filter((worker) => worker.id !== action.payload.id),
      }
    }
  }

  return state
}
