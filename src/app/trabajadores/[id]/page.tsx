import { getWorker } from '@/modules/workers'

type Params = Promise<{ id: string }>

interface Props {
  params: Params
}

async function WorkerPage({ params }: Props) {
  const { id } = await params
  const { data, error } = await getWorker(id)
  const worker = data[0]

  if (error || !worker) return <p className="text-center text-sm text-zinc-800">{error} :(</p>

  const curriculum = worker.curriculum.split('\n')

  return (
    <>
      <h1 className="text-center text-3xl font-extrabold text-primary lg:text-4xl">{worker.nombre}</h1>
      <section className="mt-8 text-zinc-800">
        <p className="text-sm">
          <strong>ID:</strong> {id}
        </p>
        <h2 className="mt-4 text-xl font-bold">Curriculum</h2>
        {curriculum.map((item, index) => (
          <p className="mt-2 text-sm lg:text-base" key={index}>
            {item}
          </p>
        ))}
      </section>
    </>
  )
}

export default WorkerPage
