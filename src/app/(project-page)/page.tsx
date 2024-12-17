/**
 * Este archivo define la página principal que muestra los proyectos del usuario.
 *
 * Importa las funciones y componentes necesarios desde el módulo de proyectos.
 *
 * La función Home obtiene los proyectos mediante la función getProjects y renderiza
 * un título, una lista de proyectos o un mensaje de error si la carga falla.
 */

import { getProjects, ProjectsContainer } from '@/modules/projects'
import { ProjectCard } from '@/modules/projects'

export default async function Home() {
  const { data, error } = await getProjects()

  return (
    <>
      <h1 className="text-center text-3xl font-extrabold text-primary lg:text-4xl">Tus proyectos</h1>
      {error || !data ? (
        <p className="mt-8 text-center text-sm text-zinc-800">{error} :(</p>
      ) : (
        <ProjectsContainer className="mt-8">
          {data.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ProjectsContainer>
      )}
    </>
  )
}
