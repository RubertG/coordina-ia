"use server"
import { createClientClient } from '@/modules/core'

import { ProjectCreationSchema, Worker } from '../types/types'
import { Response } from './projects-worker.service'
import { LangChainService } from './langchain.service'

export async function getRecommendedWorkers({}: ProjectCreationSchema): Promise<Response<Worker[]>> {
  const supabase = createClientClient()
  const bestIds = await LangChainService()
  console.log(bestIds);
  const { data, error } = await supabase.from('Trabajador').select('*').in('id', bestIds)
  console.log(data);
  console.log(error);

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
      } = await supabase.from('Proyecto_Trabajador').select('id_Proyecto').eq('id_Trabajador', worker.id)

      if (projectsError || !projects) {
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
        numberOfJobs: projects.length,
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
