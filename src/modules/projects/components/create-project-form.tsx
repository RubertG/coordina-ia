'use client'

import { Card, CardContent, CardHeader } from '@/modules/core'
import {
  createProjectSchema,
  ProjectCreationSchema,
  ProjectForm,
  WorkerItem,
  workersReducer,
  WorkersReducerState,
} from '@/modules/projects'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useReducer, useState } from 'react'
import { useForm } from 'react-hook-form'

import WorkersModal from './workers-modal'

interface Props {
  className?: string
}

const workersInitialState: WorkersReducerState = {
  workers: [],
  loading: false,
  error: '',
}

export const CreateProjectForm = ({ className }: Props) => {
  const [state, dispatch] = useReducer(workersReducer, workersInitialState)
  const [open, setOpen] = useState(false)
  const selectedWorkers = state.workers.filter((worker) => worker.isSelected)

  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<ProjectCreationSchema>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      maxWorkers: '0',
      technologies: '',
    },
  })

  const handlesubmit = async (data: ProjectCreationSchema) => {
    setIsLoading(true)
    console.log(data)
    setTimeout(() => setIsLoading(false), 2000)
  }

  const handleSelectWorker = (workerId: string) => {
    dispatch({ type: 'SELECT_WORKER', payload: workerId })
  }

  const handleOpenModal = () => {
    setOpen(!open)
  }

  const handleLoadWorkers = async () => {
    await form.handleSubmit(async (formData) => {
      console.log(formData)
      handleOpenModal()

      if (state.workers.length !== 0) return

      dispatch({ type: 'SET_LOADING', payload: true })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      dispatch({ type: 'SET_WORKERS', payload: workersInitialState.workers })
      dispatch({ type: 'SET_LOADING', payload: false })
    })()
  }

  return (
    <>
      <section
        className={clsx(`flex items-start justify-center gap-6 ${className}`, {
          'md:grid-cols-2': selectedWorkers.length > 0,
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
          {selectedWorkers.map((worker) => (
            <Card
              key={worker.id}
              className="cursor-pointer lg:transition-colors lg:hover:border-primary"
              onClick={() => handleSelectWorker(worker.id)}
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
        onLoading={() => <p>Cargando...</p>}
        error={state.error}
      >
        {(workers) => (
          <ul>
            {workers.map((worker) => (
              <WorkerItem key={worker.id} worker={worker} onClick={handleSelectWorker} />
            ))}
          </ul>
        )}
      </WorkersModal>
    </>
  )
}
