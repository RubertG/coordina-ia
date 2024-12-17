/**
 * Este archivo define la página que muestra la lista de trabajadores.
 *
 * Importa los servicios y componentes necesarios desde el módulo de trabajadores.
 *
 * La función TrabajadoresPage obtiene la lista de trabajadores mediante el servicio WorkersService
 * y renderiza un título, una lista de tarjetas de trabajadores o un mensaje de error si la carga falla.
 */

import { WorkersService } from '@/modules/workers'
import { WorkerCard } from '@/modules/workers'

export default async function TrabajadoresPage() {
  const { data: workers, error } = await WorkersService.getWorkers()

  return (
    <>
      <h1 className="text-center text-3xl font-extrabold text-primary lg:text-4xl">Página de trabajadores</h1>

      {error && <p className="mt-8 text-center text-sm text-zinc-800">{error}</p>}

      <ul className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-3">
        {workers.map((worker) => (
          <li key={worker.id}>
            <WorkerCard worker={worker} />
          </li>
        ))}
      </ul>
    </>
  )
}
