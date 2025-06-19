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
import { customAgent } from '../services/agent-suggest-improvements.service'
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
  const [openWorkersModal, setWorkersModal] = useState(false)
  const [openSuggestWithAI, setSuggestWithAI] = useState(false)
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

  const handleOpenWorkersModal = () => {
    setWorkersModal(!openWorkersModal)
  }

  const handleOpenSeggestWithAI = () => {
    setSuggestWithAI(!openSuggestWithAI)
  }

  const handleLoadWorkers = async () => {
    await form.handleSubmit(async (formData) => {
      if (JSON.stringify(prevForm) === JSON.stringify(formData)) {
        handleOpenWorkersModal()
        return
      }

      setPrevForm(formData)
      handleOpenWorkersModal()
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

  const handleSuggestWithAI = async () => {
    await form.handleSubmit(async (formData) => {
      if (JSON.stringify(prevForm) === JSON.stringify(formData) && state.resultSuggested) {
        console.log({
          prevForm,
          formData,
          stateResult: state.resultSuggested,
        })
        handleOpenSeggestWithAI()

        return
      }

      setPrevForm(formData)
      handleOpenSeggestWithAI()
      dispatch({ type: 'SET_LOADING', payload: true })

      const workers = state.selectedWorkers.map((worker) => worker.id)
      const team = state.selectedWorkers.map((worker) => worker.id)
      const res = await customAgent(formData, workers, team)
      console.log({
        workers,
        team,
        res,
      })

      dispatch({ type: 'SET_RESULT_SUGGESTED', payload: res })
      dispatch({ type: 'SET_LOADING', payload: false })
    })()
  }

  const onAccept = () => {
    // los valores de RESULT_SUGGESTED colocarlos en el formulario
    if (!state.resultSuggested) return

    const { technologies } = state.resultSuggested
    technologies && form.setValue('technologies', technologies)
  }

  return {
    form,
    handlesubmit,
    isLoading,
    isSelected,
    handleSelectWorker,
    handleOpenWorkersModal,
    handleLoadWorkers,
    state,
    openWorkersModal,
    handleSuggestWithAI,
    openSuggestWithAI,
    handleOpenSeggestWithAI,
    onAccept,
  }
}
