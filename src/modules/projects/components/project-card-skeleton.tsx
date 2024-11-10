import { Skeleton } from "@/modules/core"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/modules/core"

export const ProjectCardSkeleton = () => {
  return (
    <Card className="lg:hover:border-primary lg:transition-colors">
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <Skeleton className="h-4 w-full" />
        </CardTitle>
        <CardDescription className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardDescription>
      </CardHeader>
      <CardFooter>
          <Skeleton className="h-5 w-[45%]" />
      </CardFooter>
    </Card>
  )
}
