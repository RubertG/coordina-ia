/**
 * Formulario para la creación de un nuevo proyecto con selección de trabajadores.
 *
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} - Retorna un elemento JSX.
 */

'use client'

import { Card, CardContent, CardHeader } from '@/modules/core'
import { ProjectForm, WorkerItem, WorkersReducerState } from '@/modules/projects'
import clsx from 'clsx'

import { useProjectForm } from '../hooks/use-project-form'
import { WorkersModal } from './workers-modal'

interface Props {
  className?: string
}

const workersInitialState: WorkersReducerState = {
  workers: [],
  loading: false,
  error: '',
  selectedWorkers: [],
}

export const CreateProjectForm = ({ className }: Props) => {
  const {
    state,
    form,
    handleLoadWorkers,
    handleOpenModal,
    handleSelectWorker,
    handlesubmit,
    isLoading,
    isSelected,
    open,
  } = useProjectForm({ workersInitialState })

  return (
    <>
      <section
        className={clsx(`flex items-start justify-center gap-6 ${className}`, {
          'md:grid-cols-2': state.selectedWorkers.length > 0,
        })}
      >
        <Card className="w-full md:max-w-[600px]">
          <CardContent className="mt-4">
            <ProjectForm
              form={form}
              handlesubmit={handlesubmit}
              isLoading={isLoading}
              loadWorkers={handleLoadWorkers}
            />
          </CardContent>
        </Card>

        <ul className="flex flex-wrap gap-2 lg:gap-3">
          {state.selectedWorkers.map((worker) => (
            <Card
              key={worker.id}
              className="cursor-pointer lg:transition-colors lg:hover:border-primary"
              onClick={() => handleSelectWorker(worker)}
            >
              <CardHeader>
                <p className="line-clamp-1 text-center text-sm text-zinc-500">{worker.name}</p>
              </CardHeader>
            </Card>
          ))}
        </ul>
      </section>
      <WorkersModal
        open={open}
        setOpen={handleOpenModal}
        workers={state.workers}
        loading={state.loading}
        error={state.error}
        onLoading={() => (
          <p className="text-sm text-zinc-700">
            La busqueda de trabajadores recomendados puede durar más o menos 30 segundos cargando...
          </p>
        )}
        onError={() => <p className="text-sm text-red-500">{state.error}</p>}
      >
        {(workers) => (
          <ul>
            {workers.map((worker) => (
              <WorkerItem
                key={worker.id}
                worker={worker}
                onClick={handleSelectWorker}
                isSelected={isSelected(worker.id)}
              />
            ))}
          </ul>
        )}
      </WorkersModal>
    </>
  )
}
