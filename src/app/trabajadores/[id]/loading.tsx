import { Skeleton } from "@/modules/core"

export default function WorkerLoading() {
  return (
    <>
      <Skeleton className="w-full h-10 max-w-52 mx-auto" />
      <section className="mt-8 text-zinc-800">
        <Skeleton className="w-48 h-4" />
        <h2 className="text-xl font-bold mt-4">
          Curriculum:
        </h2>
        <Skeleton className="w-full h-5 mt-2" />
        <Skeleton className="w-full h-5 mt-2" />
        <Skeleton className="w-full h-5 mt-2" />
        <Skeleton className="w-full h-5 mt-2" />
        <Skeleton className="w-full h-5 mt-2" />
        <Skeleton className="w-full h-5 mt-2" />
        <Skeleton className="w-full h-5 mt-2" />
        <Skeleton className="w-full h-5 mt-2" />
        <Skeleton className="w-full h-5 mt-2" />
        <Skeleton className="w-full h-5 mt-2" />
      </section>
    </>
  )
}