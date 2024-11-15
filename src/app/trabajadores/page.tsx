import { WorkersService } from '@/modules/workers'
import { WorkerCard } from '@/modules/workers'
import React from 'react'

export default async function TrabajadoresPage() {
  const { data: workers, error } = await WorkersService.getWorkers()

  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-extrabold text-center text-primary">
        Página de trabajadores
      </h1>

      {
        error && (
          <p className='text-center text-zinc-800 mt-10 text-sm'>{error}</p>
        )
      }

      <ul className='mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-3'>
        {
          workers.map((worker) => (
            <li key={worker.id}>
              <WorkerCard worker={worker} />
            </li>
          ))
        }
      </ul>
    </>
  )
}
