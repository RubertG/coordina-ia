'use server'

import { createClientClient } from '@/modules/core'

import { ProjectCreationSchema, Worker } from '../types/types'
import { cosineSimilarity } from './embedding-search.service'
import { Response } from './projects-worker.service'
import { spanishToEnglish } from './translator.service'

/**
 * Obtiene una lista de trabajadores recomendados para un proyecto dado.
 * @param formData - Datos del formulario de creación de proyecto.
 * @returns Una respuesta con una lista de trabajadores recomendados.
 */
export async function getRecommendedWorkers(formData: ProjectCreationSchema): Promise<Response<Worker[]>> {
  const supabase = createClientClient()

  // Llamar a la funcion de traducir a ingles el proyecto, luego buscar los mejores trabajadores segun embedding, luego
  // llamar a langchain para extraer lo puntos relevantes, luego traducir los puntos a español
  let bestIds: string[] = []
  const project = await spanishToEnglish(formData)

  try {
    const bestWorkers = await cosineSimilarity(project, formData.maxWorkers)
    bestIds = bestWorkers ? bestWorkers.map((worker) => worker.id) : []
  } catch (error) {
    console.log('Error al obtener los trabajadores recomendados', error)
    return {
      error: 'Error al obtener los trabajadores recomendados',
      data: [],
    }
  }

  if (bestIds.length === 0) {
    return {
      error: 'No tienes trabajadores recomendados para este proyecto',
      data: [],
    }
  }

  const { data, error } = await supabase.from('Trabajador').select('*').in('id', bestIds)

  if (error || !data) {
    return {
      error: 'Error al obtener los trabajadores recomendados de la base de datos',
      data: [],
    }
  }

  const workers = await Promise.all(
    data.map(async (worker): Promise<Worker> => {
      const { data: projects, error: projectsError } = await supabase
        .from('Proyecto_Trabajador')
        .select('id_Proyecto')
        .eq('id_Trabajador', worker.id)

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

  const orderedWorkers = bestIds
    .map((id) => workers.find((worker) => worker.id === id))
    .filter((worker) => worker !== undefined)

  const sortedWorkers = orderedWorkers.sort((a, b) => b.numberOfJobs - a.numberOfJobs)

  return {
    error: null,
    data: sortedWorkers,
  }
}
