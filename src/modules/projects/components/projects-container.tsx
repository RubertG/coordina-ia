/**
 * Contenedor para mostrar una lista de proyectos.
 *
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} - Retorna un elemento JSX.
 */

interface Props {
  className?: string
  children: React.ReactNode
}

export const ProjectsContainer = ({ children, className }: Props) => {
  return (
    <ul className={`grid grid-cols-2 items-start gap-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-3 ${className}`}>
      {children}
    </ul>
  )
}
