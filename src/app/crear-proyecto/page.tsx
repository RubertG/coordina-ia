import { CreateProjectForm } from '@/modules/projects'

function CreateProjectPage() {
  return (
    <>
      <h1 className="text-center text-3xl font-extrabold text-primary lg:text-4xl">Crear proyecto</h1>
      <CreateProjectForm className="mt-8" />
    </>
  )
}

export default CreateProjectPage
