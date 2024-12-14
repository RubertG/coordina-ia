"use client"

import { Card, CardContent, CardHeader } from '@/modules/core'
import { createProjectSchema, ProjectCreationSchema, ProjectForm, WorkerItem, workersReducer, WorkersReducerState } from '@/modules/projects'
import { zodResolver } from '@hookform/resolvers/zod'
import { useReducer, useState } from 'react'
import { useForm } from 'react-hook-form'
import WorkersModal from './workers-modal'
import clsx from 'clsx'

interface Props {
  className?: string
}

const workersInitialState: WorkersReducerState = {
  workers: [
    {
      id: "1",
      name: "Juan",
      numberOfJobs: 3
    }, {
      id: "2",
      name: "Pedro",
      numberOfJobs: 2
    },
    {
      id: "3",
      name: "Maria",
      numberOfJobs: 1
    },
    {
      id: "4",
      name: "Jose",
      numberOfJobs: 4
    },
    {
      id: "5",
      name: "Ana",
      numberOfJobs: 5
    },
    {
      id: "6",
      name: "Carlos",
      numberOfJobs: 6
    },
    {
      id: "7",
      name: "Luis",
      numberOfJobs: 7
    },
    {
      id: "8",
      name: "Sofia",
      numberOfJobs: 8
    },
    {
      id: "9",
      name: "Laura",
      numberOfJobs: 9
    },
    {
      id: "10",
      name: "Lucia",
      numberOfJobs: 10
    },
    {
      id: "11",
      name: "Marta",
      numberOfJobs: 11
    },
    {
      id: "12",
      name: "Javier",
      numberOfJobs: 1
    },
    {
      id: "13",
      name: "Ricardo",
      numberOfJobs: 3
    },
    {
      id: "14",
      name: "Roberto",
      numberOfJobs: 4
    },
    {
      id: "15",
      name: "Fernando",
      numberOfJobs: 1
    }
  ],
  loading: false,
  error: ""
}

export const CreateProjectForm = ({
  className
}: Props) => {
  const [state, dispatch] = useReducer(workersReducer, workersInitialState)
  const [open, setOpen] = useState(false)
  const selectedWorkers = state.workers.filter(worker => worker.isSelected)

  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<ProjectCreationSchema>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      maxWorkers: "0",
      technologies: ""
    }
  })

  const handlesubmit = async (data: ProjectCreationSchema) => {
    setIsLoading(true)
    console.log(data)
    setTimeout(() => setIsLoading(false), 2000)
  }

  const handleSelectWorker = (workerId: string) => {
    dispatch({ type: "SELECT_WORKER", payload: workerId })
  }

  const handleOpenModal = () => {
    setOpen(!open)
  }

  const handleLoadWorkers = async () => {
    await form.handleSubmit(async (formData) => {
      console.log(formData)
      handleOpenModal()

      if (state.workers.length !== 0) return

      dispatch({ type: "SET_LOADING", payload: true })

      await new Promise(resolve => setTimeout(resolve, 2000))

      dispatch({ type: "SET_WORKERS", payload: workersInitialState.workers })
      dispatch({ type: "SET_LOADING", payload: false })
    })()
  }

  return (
    <>
      <section className={clsx(`flex items-start justify-center gap-6 ${className}`, {
        "md:grid-cols-2": selectedWorkers.length > 0
      })}>
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

        <ul className='flex flex-wrap gap-2 lg:gap-3'>
          {
            selectedWorkers.map(worker => (
              <Card
                key={worker.id}
                className="lg:hover:border-primary lg:transition-colors cursor-pointer"
                onClick={() => handleSelectWorker(worker.id)}
              >
                <CardHeader>
                  <p
                    className="text-sm text-zinc-500 line-clamp-1 text-center"
                  >
                    {worker.name}
                  </p>
                </CardHeader>
              </Card>
            ))
          }
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
        {
          (workers) => (
            <ul>
              {
                workers.map(worker => (
                  <WorkerItem key={worker.id} worker={worker} onClick={handleSelectWorker} />
                ))
              }
            </ul>
          )
        }
      </WorkersModal>
    </>
  )
}
