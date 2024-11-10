interface Props {
  className?: string
  children: React.ReactNode
}

export const ProjectContainer = ({
  children, className
}: Props) => {
  return (
    <ul className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {children}
    </ul>
  )
}
