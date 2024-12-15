import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/modules/core'
import { ReactNode } from 'react'

import { Worker } from '../types/types'

interface Props {
  className?: string
  loading?: boolean
  workers: Worker[]
  error?: string
  open: boolean
  setOpen: (open: boolean) => void

  onLoading?: () => ReactNode
  children: (workers: Worker[]) => ReactNode
}

const WorkersModal = ({ className, loading, workers, error, onLoading, children, setOpen, open }: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Selecciona los trabajadores que quieres</AlertDialogTitle>
          <AlertDialogDescription>
            Puedes elegir a los trabajadores que quieras para tu proyecto. Esta recomendación es hecha por IA. Los
            trabajadores están compuestos por su <strong>nombre</strong> y la <strong>cantidad de trabajos</strong> que
            han realizado.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className={`grid max-h-96 overflow-y-auto ${className}`}>
          {loading && onLoading?.()}

          {error && <p>{error}</p>}
          {!loading && workers.length !== 0 && !error && children(workers)}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction>Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default WorkersModal
