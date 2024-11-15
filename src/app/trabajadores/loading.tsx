import { WorkerCardSkeleton } from "@/modules/workers"

export default function WorkersLoading() {
  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-extrabold text-center text-primary">
        Página de trabajadores
      </h1>

      <ul className='mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-3'>
        {
            Array.from({ length: 30 }).map((_, index) => (
            <li key={index}>
              <WorkerCardSkeleton />
            </li>
          ))
        }
      </ul>
    </>
  )
}