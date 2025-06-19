'use client'

/**
 * Componente para mostrar un trabajador individual en la lista de selección.
 *
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} - Retorna un elemento JSX.
 */

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/modules/core'
import clsx from 'clsx'
import { Minus, Plus } from 'lucide-react'

import { Worker } from '../types/types'

interface Props {
  className?: string
  worker: Worker
  isSelected: boolean
  onClick: (worker: Worker) => void
}

export const WorkerItem = ({ className, worker, onClick, isSelected }: Props) => {
  return (
    <li
      className={clsx(
        `flex items-center justify-between border-b border-gray-200 p-2 transition-colors last:border-b-0 ${className}`,
        {
          'bg-zinc-200': isSelected,
        },
      )}
    >
      <div>
        <p className="text-sm font-semibold text-zinc-800">{worker.name}</p>
        <p className="text-xs text-zinc-700">Trabajos: {worker.numberOfJobs}</p>
      </div>

      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" onClick={() => onClick(worker)}>
                {isSelected ? <Minus /> : <Plus />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isSelected ? 'Eliminar del' : 'Añadir al'} proyecto</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </li>
  )
}
