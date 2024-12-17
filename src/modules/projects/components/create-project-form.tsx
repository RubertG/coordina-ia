'use client'

import { Card, CardContent, CardHeader } from '@/modules/core'
import {
  createProject,
  createProjectSchema,
  getRecommendedWorkers,
  ProjectCreationSchema,
  ProjectForm,
  Worker,
  WorkerItem,
  workersReducer,
  WorkersReducerState,
} from '@/modules/projects'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useReducer, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import WorkersModal from './workers-modal'

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
  const [state, dispatch] = useReducer(workersReducer, workersInitialState)
  const [prevForm, setPrevForm] = useState<ProjectCreationSchema>({
    name: '',
    description: '',
    maxWorkers: '0',
    technologies: '',
  })
  const [open, setOpen] = useState(false)
  const router = useRouter()

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

  const isSelected = (workerId: Worker['id']) => {
    return state.selectedWorkers.some((selectedWorker) => selectedWorker.id === workerId)
  }

  const handlesubmit = async (data: ProjectCreationSchema) => {
    if (state.selectedWorkers.length === 0) return

    if (state.selectedWorkers.length > parseInt(data.maxWorkers)) {
      toast.error('No puedes seleccionar más trabajadores de los que has indicado')

      return
    }

    setIsLoading(true)
    const { error, data: id } = await createProject(
      {
        descripcion: data.description,
        nombre: data.name,
        tecnologias: data.technologies,
        integrantes: state.selectedWorkers.length,
      },
      state.selectedWorkers,
    )

    if (error || !id) {
      toast.error(error)
      setIsLoading(false)

      return
    }

    toast.success('Proyecto creado correctamente')
    setIsLoading(false)
    router.push(`/proyectos/${id}`)
  }

  const handleSelectWorker = (worker: Worker) => {
    dispatch({ type: 'SELECT_WORKER', payload: worker })
  }

  const handleOpenModal = () => {
    setOpen(!open)
  }

  const handleLoadWorkers = async () => {
    await form.handleSubmit(async (formData) => {
      if (JSON.stringify(prevForm) === JSON.stringify(formData)) {
        handleOpenModal()
        return
      }

      setPrevForm(formData)
      handleOpenModal()
      dispatch({ type: 'SET_LOADING', payload: true })

      const { data, error } = await getRecommendedWorkers(formData)

      if (error) {
        dispatch({ type: 'SET_ERROR', payload: error })
        dispatch({ type: 'SET_LOADING', payload: false })

        return
      }

      dispatch({ type: 'SET_WORKERS', payload: data })
      dispatch({ type: 'SET_LOADING', payload: false })
    })()
  }

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
