/**
 * Servicio para gestionar las operaciones relacionadas con los trabajadores.
 * Proporciona métodos para obtener la lista de trabajadores y un trabajador específico.
 */

import { createClientServer, Database } from '@/modules/core'

interface Response {
  data: Database['public']['Tables']['Trabajador']['Row'][]
  error: string | null
}

export class WorkersService {
  /**
   * Obtiene la lista de todos los trabajadores.
   * @returns {Promise<Response>} - Una promesa que resuelve con la lista de trabajadores y un posible error.
   */
  static async getWorkers(): Promise<Response> {
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
  static async getWorker(id: string): Promise<Response> {
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
}
