import clsx from "clsx"
import { SelectedWorker } from "../types/types"

interface Props {
  className?: string
  worker: SelectedWorker
  onClick: (workerId: string) => void
}

export const WorkerItem = ({
  className,
  worker,
  onClick
}: Props) => {
  return (
    <li
      className={clsx(`flex justify-between items-center p-2 border-b last:border-b-0 border-gray-200 lg:hover:bg-zinc-100 cursor-pointer ${className}`, {
        "bg-zinc-200": worker.isSelected
      })}
      onClick={() => onClick(worker.id)}
    >
      <p className="text-zinc-700 ">{worker.name}</p>
      <p>{worker.numberOfJobs}</p>
    </li>
  )
}
