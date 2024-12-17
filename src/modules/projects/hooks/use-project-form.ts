/**
 * Hook personalizado para manejar el formulario de creación de proyectos.
 *
 * @param {Props} props - Las propiedades iniciales del hook.
 * @returns {Object} - Retorna los métodos y estados necesarios para manejar el formulario.
 */

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useReducer, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { workersReducer } from '../reducers/workers-reducer'
import { createProjectSchema } from '../schemas/create-project.schema'
import { createProject } from '../services/projects.service'
import { getRecommendedWorkers } from '../services/recommended-workers.service'
import { ProjectCreationSchema, Worker, WorkersReducerState } from '../types/types'

interface Props {
  workersInitialState: WorkersReducerState
}

export const useProjectForm = ({ workersInitialState }: Props) => {
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

  return {
    form,
    handlesubmit,
    isLoading,
    isSelected,
    handleSelectWorker,
    handleOpenModal,
    handleLoadWorkers,
    state,
    open,
  }
}
