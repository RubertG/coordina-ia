import { WorkerCardSkeleton } from '@/modules/workers'

export default function WorkersLoading() {
  return (
    <>
      <h1 className="text-center text-3xl font-extrabold text-primary lg:text-4xl">Página de trabajadores</h1>

      <ul className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-3">
        {Array.from({ length: 30 }).map((_, index) => (
          <li key={index}>
            <WorkerCardSkeleton />
          </li>
        ))}
      </ul>
    </>
  )
}
