import { WorkersService } from "@/modules/workers"

type Params = Promise<{ id: string }>

interface Props {
  params: Params
}


async function WorkerPage({
  params
}: Props) {
  const { id } = await params
  const { data, error } = await WorkersService.getWorker(id)
  const worker = data[0]

  if (error || !worker) return (
    <p className="text-center text-zinc-800 text-sm">{error} :(</p>
  )

  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-extrabold text-center text-primary">
        {worker.nombre}
      </h1>
      <section className="mt-8 text-zinc-800">
        <p className="text-sm">
          <strong>ID:</strong> {id}
        </p>
        <h2 className="text-xl font-bold mt-4">
          Curriculum:
        </h2>
        <p className="mt-2" dangerouslySetInnerHTML={{ __html: worker.curriculum }} />
      </section>
    </>
  )
}

export default WorkerPage
