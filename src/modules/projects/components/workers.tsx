import { ProjectsWorkerService } from "../services/projects-worker.service"

interface Props {
  className?: string
  idProject: string
}

export const Workers = async ({
  className, idProject
}: Props) => {
  const { data, error } = await ProjectsWorkerService.getProjectsMembers(idProject)

  if (!data || error) return null

  return (
    <ul className={`${className}`}>
      {
        data.map((worker) => (
          <li
            key={worker.id}
            className="list-disc ml-10 mt-2"
          >
            {worker.nombre}
          </li>
        ))
      }
    </ul>
  )
}
