import { ProjectsContainer, ProjectsService } from "@/modules/projects"
import { ProjectCard } from "@/modules/projects"

export default async function Home() {
  const { data, error } = await ProjectsService.getProjects()

  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-extrabold text-center text-primary">
        Tus proyectos
      </h1>
      {
        error || !data ? (
          <p className="text-center text-zinc-800 mt-10 text-sm">{error} :(</p>
        ) : (
          <ProjectsContainer className="mt-8">
            {
              data.map((project) => (
                <li key={project.id}>
                  <ProjectCard project={project} />
                </li>
              ))
            }
          </ProjectsContainer>
        )
      }
    </>
  )
}
