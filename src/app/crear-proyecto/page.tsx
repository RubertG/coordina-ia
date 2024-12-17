/**
 * Este archivo define la página para crear un nuevo proyecto.
 *
 * Importa el componente CreateProjectForm desde el módulo de proyectos y lo utiliza
 * dentro de un componente funcional de React llamado CreateProjectPage.
 *
 * El componente CreateProjectPage renderiza un título y el formulario para crear un proyecto.
 */

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
