/**
 * Servicio para gestionar las operaciones relacionadas con los trabajadores.
 * Proporciona funciones para obtener la lista de trabajadores, un trabajador específico y crear un trabajador.
 */
'use server'

import { createClientServer, Database } from '@/modules/core'

interface Response {
  data: Database['public']['Tables']['Trabajador']['Row'][]
  error: string | null
}

/**
 * Obtiene la lista de todos los trabajadores.
 * @returns {Promise<Response>} - Una promesa que resuelve con la lista de trabajadores y un posible error.
 */
export async function getWorkers(): Promise<Response> {
  const supabase = await createClientServer()
  const { data, error } = await supabase.from('Trabajador').select('*')

  if (error || !data)
    return {
      data: [],
      error: 'Error al obtener los trabajadores',
    }

  return {
    data: data,
    error: null,
  }
}

/**
 * Obtiene un trabajador específico por su ID.
 * @param {string} id - El ID del trabajador a obtener.
 * @returns {Promise<Response>} - Una promesa que resuelve con el trabajador y un posible error.
 */
export async function getWorker(id: string): Promise<Response> {
  const supabase = await createClientServer()
  const { data, error } = await supabase.from('Trabajador').select('*').eq('id', id)

  if (error || !data)
    return {
      data: [],
      error: 'Error al obtener el trabajador',
    }

  return {
    data: data,
    error: null,
  }
}

/**
 * Crea un nuevo trabajador.
 * @param {Database['public']['Tables']['Trabajador']['Insert']} worker - Los datos del trabajador a crear.
 * @returns {Promise<Response>} - Una promesa que resuelve con el trabajador creado y un posible error.
 */
export async function createWorker(worker: Database['public']['Tables']['Trabajador']['Insert']): Promise<Response> {
  const supabase = await createClientServer()
  const { error } = await supabase.from('Trabajador').insert(worker)

  if (error) {
    return {
      data: [],
      error: 'Error al crear el trabajador',
    }
  }

  return {
    data: [],
    error: null,
  }
}
