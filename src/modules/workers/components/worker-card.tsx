/**
 * Componente de tarjeta para mostrar la información de un trabajador.
 * Proporciona un enlace a la página de detalles del trabajador.
 */

import { Card, CardHeader, Database, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/modules/core'
import Link from 'next/link'

interface Props {
  worker: Database['public']['Tables']['Trabajador']['Row']
}

export const WorkerCard = ({ worker }: Props) => {
  return (
    <Link href={`/trabajadores/${worker.id}`}>
      <Card className="lg:transition-colors lg:hover:border-primary">
        <CardHeader>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p className="line-clamp-1 text-sm text-zinc-500">{worker.nombre}</p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="line-clamp-1 text-sm text-zinc-100">{worker.nombre}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
      </Card>
    </Link>
  )
}
