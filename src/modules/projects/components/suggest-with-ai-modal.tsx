/**
 * Modal para seleccionar trabajadores recomendados para un proyecto.
 *
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} - Retorna un elemento JSX.
 */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/modules/core'
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import { ReactNode } from 'react'

interface Props {
  className?: string
  loading?: boolean
  error?: string
  open: boolean
  setOpen: (open: boolean) => void

  onLoading?: () => ReactNode
  onError?: () => ReactNode
  children: ReactNode
  onAccept: () => void
}

const SuggestWithAIModal = ({
  className = '',
  loading,
  error,
  onLoading,
  children,
  setOpen,
  open,
  onError,
  onAccept,
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="!max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Sugerencias</AlertDialogTitle>
          <AlertDialogDescription>
            Aquí puedes ver las sugerencias de trabajadores recomendados para tu proyecto.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className={`${className}`}>
          {loading && onLoading?.()}

          {error && !loading && onError?.()}

          {!loading && !error && children}
        </div>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onAccept}>Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { SuggestWithAIModal }
