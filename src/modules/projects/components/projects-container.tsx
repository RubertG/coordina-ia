interface Props {
  className?: string
  children: React.ReactNode
}

export const ProjectsContainer = ({
  children, className
}: Props) => {
  return (
    <ul className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3 items-start ${className}`}>
      {children}
    </ul>
  )
}
