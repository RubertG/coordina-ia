import { createClientServer, Database } from "../../core"

interface Response {
  error: string | null
  data: Database["public"]["Tables"]["Proyecto"]["Row"][] | null
}

export class ProjectsService {
  static async getProjects(): Promise<Response> {
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

  static async getProject(id: string): Promise<Response> {
    const supabase = await createClientServer()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError) return {
      error: "Error al iniciar sesión",
      data: null
    }

    const { data, error: projectsError } = await supabase
      .from("Proyecto")
      .select("*")
      .eq("id", id)
      .eq("usuario_id", user?.id || "")

    if (projectsError) return {
      error: "Error al obtener el proyecto",
      data: null
    }

    return {
      error: null,
      data
    }
  }
}