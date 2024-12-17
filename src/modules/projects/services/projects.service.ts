'use server'

import { v4 as uuid } from 'uuid'

import { createClientServer, type Database } from '../../core'
import { type Worker } from '../types/types'

interface Response<T = Database['public']['Tables']['Proyecto']['Row'][]> {
  error: string | null
  data: T | null
}

type ProjectType = Database['public']['Tables']['Proyecto']['Row']

/**
 * Obtiene todos los proyectos del usuario autenticado.
 * @returns Una respuesta con una lista de proyectos.
 */
export async function getProjects(): Promise<Response> {
  const supabase = await createClientServer()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError)
    return {
      error: 'Error al iniciar sesión',
      data: [],
    }

  const { data, error: projectsError } = await supabase
    .from('Proyecto')
    .select('*')
    .eq('usuario_id', user?.id || '')

  if (projectsError)
    return {
      error: 'Error al obtener los proyectos',
      data: [],
    }

  return {
    error: null,
    data,
  }
}

/**
 * Obtiene un proyecto específico del usuario autenticado.
 * @param id - ID del proyecto.
 * @returns Una respuesta con el proyecto solicitado.
 */
export async function getProject(id: string): Promise<Response> {
  const supabase = await createClientServer()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError)
    return {
      error: 'Error al iniciar sesión',
      data: null,
    }

  const { data, error: projectsError } = await supabase
    .from('Proyecto')
    .select('*')
    .eq('id', id)
    .eq('usuario_id', user?.id || '')

  if (projectsError)
    return {
      error: 'Error al obtener el proyecto',
      data: null,
    }

  return {
    error: null,
    data,
  }
}

/**
 * Crea un nuevo proyecto y asocia trabajadores a él.
 * @param projectData - Datos del proyecto.
 * @param workers - Lista de trabajadores a asociar.
 * @returns Una respuesta con el ID del proyecto creado.
 */
export async function createProject(
  projectData: Omit<ProjectType, 'id' | 'usuario_id'>,
  workers: Worker[],
): Promise<Response<string>> {
  const supabase = await createClientServer()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError)
    return {
      error: 'Error al iniciar sesión',
      data: null,
    }

  const id = uuid()
  const { error } = await supabase.from('Proyecto').insert({
    ...projectData,
    id,
    usuario_id: user?.id || '',
  })

  const { error: workersError } = await supabase.from('Proyecto_Trabajador').insert(
    workers.map(
      (worker) =>
        ({
          id_Proyecto: id,
          id_Trabajador: worker.id,
        }) as Database['public']['Tables']['Proyecto_Trabajador']['Row'],
    ),
  )

  console.log(error, workersError)

  if (error)
    return {
      error: 'Error al crear el proyecto',
      data: null,
    }

  if (workersError)
    return {
      error: 'Error al crear el proyecto',
      data: null,
    }

  return {
    error: null,
    data: id,
  }
}

/**
 * Elimina un proyecto específico del usuario autenticado.
 * @param id - ID del proyecto.
 * @returns Una respuesta indicando el resultado de la operación.
 */
export async function deleteProject(id: string): Promise<Response> {
  const supabase = await createClientServer()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError)
    return {
      error: 'Error al iniciar sesión',
      data: null,
    }

  const { error } = await supabase
    .from('Proyecto')
    .delete()
    .eq('id', id)
    .eq('usuario_id', user?.id || '')

  console.log(error)

  if (error)
    return {
      error: 'Error al eliminar el proyecto',
      data: null,
    }

  return {
    error: null,
    data: null,
  }
}
