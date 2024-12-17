/**
 * Tarjeta para mostrar la información de un proyecto.
 *
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} - Retorna un elemento JSX.
 */

import { Card, CardHeader, CardTitle, CardDescription, CardFooter, Database } from '@/modules/core'
import Link from 'next/link'

interface Props {
  project: Database['public']['Tables']['Proyecto']['Row']
}

export const ProjectCard = ({ project }: Props) => {
  return (
    <Link href={`/proyectos/${project.id}`}>
      <Card className="lg:transition-colors lg:hover:border-primary">
        <CardHeader>
          <CardTitle className="line-clamp-2">{project.nombre}</CardTitle>
          <CardDescription className="line-clamp-2">{project.descripcion}</CardDescription>
        </CardHeader>
        <CardFooter>
          <p className="text-sm text-zinc-500">{project.integrantes} integrantes</p>
        </CardFooter>
      </Card>
    </Link>
  )
}
