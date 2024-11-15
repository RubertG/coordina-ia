import { Card, CardHeader, Database, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/modules/core"
import Link from "next/link"

interface Props {
  worker: Database["public"]["Tables"]["Trabajador"]["Row"]
}

export const WorkerCard = ({
  worker
}: Props) => {
  return (
    <Link href={`/trabajadores/${worker.id}`}>
      <Card className="lg:hover:border-primary lg:transition-colors">
        <CardHeader>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p
                  className="text-sm text-zinc-500 line-clamp-1"
                >
                  {worker.nombre}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm text-zinc-500 line-clamp-1">{worker.nombre}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
      </Card>
    </Link>
  )
}
