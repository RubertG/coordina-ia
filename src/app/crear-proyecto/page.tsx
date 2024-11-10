import { CreateProjectForm } from "@/modules/projects"

function CreateProjectPage() {
  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-extrabold text-center text-primary">
        Crear proyecto
      </h1>
      <section className="flex flex-wrap justify-center gap-4 mt-8">
        <CreateProjectForm className="max-w-xl" />
      </section>
    </>
  )
}

export default CreateProjectPage