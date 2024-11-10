import { Card, CardHeader, CardTitle, CardDescription, CardFooter, Database } from "@/modules/core"
import Link from "next/link"

interface Props {
  project: Database["public"]["Tables"]["Proyecto"]["Row"]
}

export const ProjectCard = ({
  project
}: Props) => {
  return (
    <Link href={`/proyectos/${project.id}`}>
      <Card className="lg:hover:border-primary lg:transition-colors">
        <CardHeader>
          <CardTitle className="line-clamp-2">
            {project.nombre}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {project.descripcion}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <p className="text-sm text-zinc-500">
            {project.integrantes} integrantes
          </p>
        </CardFooter>
      </Card>
    </Link>
  )
}
