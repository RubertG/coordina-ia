import { createClientServer } from "../../core"

export class ProjectsService {
  static async getProjects() {
    const supabase = await createClientServer()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError) return {
      error: "Error al iniciar sesión",
      data: []
    }

    const { data, error: projectsError } = await supabase.from("Proyecto").select("*").eq("usuario_id", user?.id || "")

    if (projectsError) return {
      error: "Error al obtener los proyectos",
      data: []
    }

    return {
      error: null,
      data
    }
  }
}