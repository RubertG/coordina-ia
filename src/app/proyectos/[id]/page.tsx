/**
 * Este archivo define la página de detalles de un proyecto específico.
 *
 * Importa los componentes y funciones necesarios desde los módulos core y projects.
 *
 * La función ProjectPage obtiene los detalles del proyecto mediante la función getProject
 * y renderiza la información del proyecto, incluyendo nombre, descripción, tecnologías e integrantes.
 * También incluye botones para editar y eliminar el proyecto.
 */

import { Button } from '@/modules/core'
import { DeleteProjectButton, getProject, Workers } from '@/modules/projects'
import { Suspense } from 'react'

type Params = Promise<{ id: string }>

interface Props {
  params: Params
}

async function ProjectPage(props: Props) {
  const { id } = await props.params
  const { data: projects, error } = await getProject(id)

  if (error || !projects)
    return (
      <>
        <p className="text-center text-sm text-zinc-800">{error} :(</p>
      </>
    )

  const { nombre, descripcion, integrantes, tecnologias } = projects[0]

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-center text-3xl font-extrabold text-primary lg:text-4xl">{nombre}</h1>
      <p className="mt-8 whitespace-pre-line">{descripcion}</p>

      <section className="mt-5 flex flex-wrap gap-5 md:gap-10">
        <article className="text-zinc-800">
          <h2 className="font-bold">Tecnologías</h2>
          <ul className="ml-10 mt-2 list-disc">
            {tecnologias.split(',').map((tecnologia, index) => (
              <li className="capitalize" key={tecnologia + index}>
                {tecnologia}
              </li>
            ))}
          </ul>
        </article>
        <article className="text-zinc-800">
          <h2 className="font-bold">Integrantes</h2>
          <p className="mt-2">{integrantes} trabajadores en el proyecto</p>
          <Suspense>
            <Workers idProject={id} />
          </Suspense>
        </article>
      </section>

      <section className="mt-8 flex items-center gap-3">
        <Button>Editar proyecto</Button>
        <DeleteProjectButton idProject={id} />
      </section>
    </div>
  )
}

export default ProjectPage
