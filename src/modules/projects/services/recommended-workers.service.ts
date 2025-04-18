'use server'

import { createClientClient } from '@/modules/core'

import { ProjectCreationSchema, Worker } from '../types/types'
import { LangChainService } from './langchain.service'
import { Response } from './projects-worker.service'

/**
 * Obtiene una lista de trabajadores recomendados para un proyecto dado.
 * @param formData - Datos del formulario de creación de proyecto.
 * @returns Una respuesta con una lista de trabajadores recomendados.
 */
export async function getRecommendedWorkers(formData: ProjectCreationSchema): Promise<Response<Worker[]>> {
  const supabase = createClientClient()

  // ids de los mejores trabajadores segun el embedding
  const ids = ["5fc4493a-e2a4-458a-8423-70306f6f6482", "7ab4945c-2d5a-486e-a9f7-692c3df536e0", "3ff0c698-c267-4720-a188-c5e0e8f71d2b", "277ca22a-0f2a-4c79-a4f8-fa40851ad74d", "d3c05ea3-67c8-47ef-ba08-3d3024bb260a"]
  // descripcion del proyecto a crear
  // "FitJourney is an enterprise-level web platform designed to optimize tracking and management of users' physical and nutritional wellness through an interactive and personalized experience. The application allows users to log workouts, set health goals, and monitor nutrition, all while following training programs tailored to their specific needs. The platform features interactive charts and a progress tracking system to provide users with detailed insights into their performance and results. Additionally, it incorporates social features such as sharing achievements and motivating others through a badge and rewards system. The user interface is intuitive and modern, supporting both dark and light modes, with a customizable dashboard that adapts to individual user preferences. The primary goal is to empower users—from beginners to advanced athletes—with tools to build healthier habits, maintain consistency in workouts, and improve physical and mental performance. The platform is designed for corporate and organizational implementation, allowing for the integration of data at the enterprise level, with customizable metrics aligned with organizational health and wellness objectives."
  // tecnologias del proyecto a crear
  // "React.js, TypeScript, Tailwind CSS, Node.js, Express.js, MongoDB, JWT, OAuth (Google, Apple), Vercel/Netlify (frontend), Render/Railway (backend), Git, GitHub, Figma, ESLint, Prettier."

  let bestWorkers = [];
  let bestIds: string[] = [];

  try {
    bestWorkers = await LangChainService(ids, formData)
    bestIds = bestWorkers.map((worker) => worker.id)
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

      const keyPoints = bestWorkers.find((wor) => wor.id === worker.id)?.points || [];
      
      if (projectsError || !projects) {
        return {
          name: worker.nombre,
          id: worker.id,
          curriculum: worker.curriculum,
          numberOfJobs: 0,
          keyPoints,
        }
      }

      return {
        name: worker.nombre,
        id: worker.id,
        curriculum: worker.curriculum,
        numberOfJobs: projects.length,
        keyPoints,
      }
    }),
  )

  const orderedWorkers = bestIds
    .map((id) => workers.find((worker) => worker.id === id))
    .filter((worker) => worker !== undefined)

  const sortedWorkers = orderedWorkers.sort((a, b) => b.numberOfJobs - a.numberOfJobs)
  
  return {
    error: null,
    data: sortedWorkers.slice(0, 10),
  }
}
