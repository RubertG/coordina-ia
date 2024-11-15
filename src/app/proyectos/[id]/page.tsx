import { Button } from "@/modules/core"
import { DeleteProjectButton, ProjectsService, Workers } from "@/modules/projects"
import { Suspense } from "react"

type Params = Promise<{ id: string }>

interface Props {
  params: Params
}

async function ProjectPage(props: Props) {
  const { id } = await props.params
  const { data: projects, error } = await ProjectsService.getProject(id)

  if (error || !projects) return (
    <>
      <p className="text-center text-zinc-800 text-sm">{error} :(</p>
    </>
  )

  const { nombre, descripcion, integrantes, tecnologias } = projects[0]

  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-extrabold text-center text-primary">
        {nombre}
      </h1>
      <p className="mt-8 text-zinc-800">
        {descripcion}
      </p>

      <section className="flex gap-5 md:gap-10 flex-wrap mt-5">
        <article className="text-zinc-800">
          <h2 className="text-lg font-bold">
            Tecnologías
          </h2>
          <ul className="list-disc ml-10 mt-2">
            {
              tecnologias.split(',').map((tecnologia, index) => (
                <li
                  key={tecnologia + index}
                >
                  {tecnologia}
                </li>
              ))
            }
          </ul>
        </article>
        <article className="text-zinc-800">
          <h2 className="text-lg font-bold">
            Integrantes
          </h2>
          <p className="mt-2">{integrantes} trabajadores en el proyecto</p>
          <Suspense>
            <Workers idProject={id} />
          </Suspense>
        </article>
      </section>

      <section className="mt-8 flex gap-3 items-center">
        <Button>
          Editar proyecto
        </Button>
        <DeleteProjectButton idProject={id} />
      </section>
    </>
  )
}

export default ProjectPage