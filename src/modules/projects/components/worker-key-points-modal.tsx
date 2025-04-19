import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/modules/core'

import { Worker } from '../types/types'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  worker: Worker
}

export const WorkerKeyPointsModal = ({ setOpen, open, worker }: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{worker.name}</AlertDialogTitle>
          <AlertDialogDescription>
            Este trabajador tiene {worker.numberOfJobs} trabajos realizados o en curso. Además, tiene los siguientes
            puntos clave:
          </AlertDialogDescription>
        </AlertDialogHeader>

        <ul className="space-y-1">
          {worker.keyPoints.map((point, index) => (
            <li key={index} className="ml-4 list-disc text-sm text-zinc-700">
              {point}
            </li>
          ))}
        </ul>

        <AlertDialogFooter>
          <AlertDialogAction>Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
