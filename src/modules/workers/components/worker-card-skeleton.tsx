import { Card, CardHeader, Skeleton } from "@/modules/core"

export const WorkerCardSkeleton = () => {
  return (
    <Card className="lg:hover:border-primary lg:transition-colors">
      <CardHeader>
        <Skeleton
          className="w-full h-[21px] line-clamp-1"
        />
      </CardHeader>
    </Card>
  )
}
