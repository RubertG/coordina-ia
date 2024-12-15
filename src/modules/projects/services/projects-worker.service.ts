import { createClientServer, Database } from '@/modules/core'

export interface Response<T = Database['public']['Tables']['Trabajador']['Row'][]> {
  error: string | null
  data: T
}

export class ProjectsWorkerService {
  static async getProjectsMembers(idProject: string): Promise<Response> {
    const supabase = await createClientServer()
    const { data, error: workersError } = await supabase
      .from('Proyecto_Trabajador')
      .select('id_Trabajador')
      .eq('id_Proyecto', idProject)

    if (workersError || !data)
      return {
        error: 'Error al obtener los miembros del proyecto',
        data: [],
      }

    const { data: users, error: usersError } = await supabase
      .from('Trabajador')
      .select('*')
      .in(
        'id',
        data.map(({ id_Trabajador }) => id_Trabajador),
      )

    if (usersError || !users)
      return {
        error: 'Error al obtener los miembros del proyecto',
        data: [],
      }

    return {
      error: null,
      data: users,
    }
  }
}
