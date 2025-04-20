/**
 * Hook personalizado para manejar el formulario de creación de proyectos.
 *
 * @param {Props} props - Las propiedades iniciales del hook.
 * @returns {Object} - Retorna los métodos y estados necesarios para manejar el formulario.
 */

'use client'

import { Database } from '@/modules/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createWorkerSchema } from '../schemas/create-worker.schema'
import { createWorker } from '../services/workers.service'

type Worker = Database['public']['Tables']['Trabajador']['Insert']

interface Props {
  worker: Worker
}

export const useWorkerForm = ({ worker }: Props) => {
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const form = useForm<Worker>({
    resolver: zodResolver(createWorkerSchema),
    defaultValues: worker,
  })

  const handlesubmit = async (newWorker: Worker) => {
    setLoading(true)

    try {
      const { error } = await createWorker(newWorker)

      if (error) {
        toast.error(error)

        return
      }

      toast.success('Trabajador creado correctamente')
      router.push('/trabajadores')
    } catch (error) {
      toast.error('Error al crear el trabajador')
    } finally {
      setLoading(false)
    }
  }

  return {
    form,
    loading,
    handlesubmit,
  }
}
