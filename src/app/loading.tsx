import { ProjectCardSkeleton, ProjectsContainer } from "@/modules/projects"

export default function LoadingPage() {

  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-extrabold text-center text-primary">
        Tus proyectos
      </h1>
      <ProjectsContainer className="mt-8">
        {
          Array.from({ length: 16 }).map((_, index) => (
            <li key={index}>
              <ProjectCardSkeleton />
            </li>
          ))
        }
      </ProjectsContainer>
    </>
  )
}
