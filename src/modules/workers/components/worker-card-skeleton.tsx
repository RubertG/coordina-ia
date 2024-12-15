import { Card, CardHeader, Skeleton } from '@/modules/core'

export const WorkerCardSkeleton = () => {
  return (
    <Card className="lg:transition-colors lg:hover:border-primary">
      <CardHeader>
        <Skeleton className="line-clamp-1 h-[21px] w-full" />
      </CardHeader>
    </Card>
  )
}
