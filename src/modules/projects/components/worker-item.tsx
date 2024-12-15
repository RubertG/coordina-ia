import clsx from 'clsx'

import { SelectedWorker } from '../types/types'

interface Props {
  className?: string
  worker: SelectedWorker
  onClick: (workerId: string) => void
}

export const WorkerItem = ({ className, worker, onClick }: Props) => {
  return (
    <li
      className={clsx(
        `flex cursor-pointer items-center justify-between border-b border-gray-200 p-2 last:border-b-0 lg:hover:bg-zinc-100 ${className}`,
        {
          'bg-zinc-200': worker.isSelected,
        },
      )}
      onClick={() => onClick(worker.id)}
    >
      <p className="text-zinc-700 ">{worker.name}</p>
      <p>{worker.numberOfJobs}</p>
    </li>
  )
}
