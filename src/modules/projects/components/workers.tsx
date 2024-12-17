/**
 * Componente para mostrar la lista de trabajadores de un proyecto.
 *
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element | null} - Retorna un elemento JSX o null si hay un error.
 */

import { ProjectsWorkerService } from '../services/projects-worker.service'

interface Props {
  className?: string
  idProject: string
}

export const Workers = async ({ className, idProject }: Props) => {
  const { data, error } = await ProjectsWorkerService.getProjectsMembers(idProject)

  if (!data || error) return null

  return (
    <ul className={`${className}`}>
      {data.map((worker) => (
        <li key={worker.id} className="ml-10 mt-2 list-disc">
          {worker.nombre}
        </li>
      ))}
    </ul>
  )
}
