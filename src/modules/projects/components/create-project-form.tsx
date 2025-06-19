/**
 * Formulario para la creación de un nuevo proyecto con selección de trabajadores.
 *
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} - Retorna un elemento JSX.
 */

'use client'

import { Card, CardContent, CardHeader } from '@/modules/core'
import { ProjectForm, WorkerItem, WorkersReducerState } from '@/modules/projects'

import { useProjectForm } from '../hooks/use-project-form'
import { SuggestWithAIModal } from './suggest-with-ai-modal'
import { WorkersModal } from './workers-modal'

interface Props {
  className?: string
}

const workersInitialState: WorkersReducerState = {
  workers: [],
  loading: false,
  error: '',
  selectedWorkers: [],
  resultSuggested: null,
}

export const CreateProjectForm = ({ className }: Props) => {
  const {
    state,
    form,
    handleLoadWorkers,
    handleOpenWorkersModal,
    handleSelectWorker,
    handlesubmit,
    isLoading,
    isSelected,
    openWorkersModal,
    handleSuggestWithAI,
    handleOpenSeggestWithAI,
    openSuggestWithAI,
    onAccept,
  } = useProjectForm({ workersInitialState })

  return (
    <>
      <section className={`flex flex-wrap items-start justify-center gap-6 md:flex-nowrap ${className}`}>
        <Card className="w-full md:min-w-[400px] md:max-w-[700px]">
          <CardContent className="mt-4">
            <ProjectForm
              form={form}
              handlesubmit={handlesubmit}
              isLoading={isLoading}
              loadWorkers={handleLoadWorkers}
              suggestWithAI={handleSuggestWithAI}
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
        open={openWorkersModal}
        setOpen={handleOpenWorkersModal}
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
            {workers?.map((worker) => (
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

      <SuggestWithAIModal
        open={openSuggestWithAI}
        setOpen={handleOpenSeggestWithAI}
        loading={state.loading}
        error={state.error}
        onAccept={onAccept}
        onLoading={() => (
          <p className="text-sm text-zinc-700">La sugerencia con IA puede durar más o menos 30 segundos cargando...</p>
        )}
        onError={() => <p className="text-sm text-red-500">{state.error}</p>}
      >
        {state.resultSuggested?.technologies && (
          <>
            <h2>Tecnologías sugeridas</h2>
            <p className="text-sm text-zinc-700">{state.resultSuggested.technologies}</p>
          </>
        )}

        {state.resultSuggested?.team?.workers?.length !== 0 && (
          <>
            <h2 className="mt-2">Equipo sugerido</h2>

            <p className="text-sm text-zinc-700">Los puntos clave de los trabajadores sugeridos son los siguientes:</p>

            <ul>
              {state.resultSuggested?.team?.points?.map((point, index) => (
                <li key={index} className="ml-4 list-disc text-sm text-zinc-700">
                  {point}
                </li>
              ))}
            </ul>

            <p className="mt-2 text-sm text-zinc-700">
              La lista de trabajadores sugeridos para el equipo es la siguiente:
            </p>

            <ul className="mt-2 grid max-h-72 overflow-y-auto overflow-x-hidden rounded-lg">
              {state.resultSuggested?.team?.workers?.map((worker) => (
                <WorkerItem
                  key={worker.id}
                  worker={worker}
                  onClick={handleSelectWorker}
                  isSelected={isSelected(worker.id)}
                />
              ))}
            </ul>
          </>
        )}

        {state.resultSuggested?.workers?.length !== 0 && (
          <>
            <h2 className="mt-2">Trabajadores recomendados</h2>
            <ul className="mt-2 grid max-h-72 overflow-y-auto overflow-x-hidden rounded-lg">
              {state.resultSuggested?.workers?.map((worker) => (
                <WorkerItem
                  key={worker.id}
                  worker={worker}
                  onClick={handleSelectWorker}
                  isSelected={isSelected(worker.id)}
                />
              ))}
            </ul>
          </>
        )}

        {!state.resultSuggested?.technologies &&
          state.resultSuggested?.team?.workers?.length === 0 &&
          state.resultSuggested?.workers?.length === 0 && (
            <p className="text-sm text-zinc-700">No hay sugerencias para este proyecto.</p>
          )}
      </SuggestWithAIModal>
    </>
  )
}
