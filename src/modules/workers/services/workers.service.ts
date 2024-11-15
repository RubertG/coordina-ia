import { createClientServer, Database } from "@/modules/core"

interface Response {
  data: Database["public"]["Tables"]["Trabajador"]["Row"][]
  error: string | null
}

export class WorkersService {
  static async getWorkers(): Promise<Response> {
    const supabase = await createClientServer()
    const { data, error } = await supabase.from("Trabajador").select("*")

    if (error || !data) return {
      data: [],
      error: "Error al obtener los trabajadores"
    }

    return {
      data: data,
      error: null
    }
  }
}