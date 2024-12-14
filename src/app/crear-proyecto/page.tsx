import { CreateProjectForm } from "@/modules/projects"

function CreateProjectPage() {
  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-extrabold text-center text-primary">
        Crear proyecto
      </h1>
      <CreateProjectForm className="mt-8" />
    </>
  )
}

export default CreateProjectPage