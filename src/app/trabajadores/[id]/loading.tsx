import { Skeleton } from '@/modules/core'

export default function WorkerLoading() {
  return (
    <>
      <Skeleton className="mx-auto h-10 w-full max-w-52" />
      <section className="mt-8 text-zinc-800">
        <Skeleton className="h-4 w-48" />
        <h2 className="mt-4 text-xl font-bold">Curriculum:</h2>
        <Skeleton className="mt-2 h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-full" />
      </section>
    </>
  )
}
