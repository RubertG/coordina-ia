/**
 * Componente para mostrar un trabajador individual en la lista de selección.
 *
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} - Retorna un elemento JSX.
 */

import clsx from 'clsx'

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
        `flex cursor-pointer items-center justify-between border-b border-gray-200 p-2 last:border-b-0 lg:hover:bg-zinc-100 ${className}`,
        {
          'bg-zinc-200': isSelected,
        },
      )}
      onClick={() => onClick(worker)}
    >
      <p className="text-sm text-zinc-700">{worker.name}</p>
      <p>{worker.numberOfJobs}</p>
    </li>
  )
}
