import { createClientClient } from '@/modules/core'

import { ProjectCreationSchema, Worker } from '../types/types'
import { Response } from './projects-worker.service'

export async function getRecommendedWorkers({}: ProjectCreationSchema): Promise<Response<Worker[]>> {
  const supabase = createClientClient()
  const { data, error } = await supabase.from('Trabajador').select('*')

  if (error || !data) {
    return {
      error: 'Error al obtener los trabajadores recomendados',
      data: [],
    }
  }

  const workers = await Promise.all(
    data.map(async (worker): Promise<Worker> => {
      const {
        data: projects,
        error: projectsError,
        count,
      } = await supabase.from('Proyecto_Trabajador').select('id_Proyecto').eq('id_Trabajador', worker.id)

      if (projectsError || !projects || !count) {
        return {
          name: worker.nombre,
          id: worker.id,
          curriculum: worker.curriculum,
          numberOfJobs: 0,
        }
      }

      return {
        name: worker.nombre,
        id: worker.id,
        curriculum: worker.curriculum,
        numberOfJobs: count,
      }
    }),
  )

  // ordenar de mas trabajos a menos trabajos
  const sortedWorkers = workers.sort((a, b) => b.numberOfJobs - a.numberOfJobs)

  return {
    error: null,
    data: sortedWorkers.slice(0, 10),
  }
}
