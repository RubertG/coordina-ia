import { Button } from "@/modules/core"
import { Loader2 } from "lucide-react"

interface Props {
  isLoading: boolean
  text: string
  textLoading?: string
  className?: string
}

export const SubmitButton = ({
  isLoading,
  text, 
  textLoading,
  className
}: Props) => {
  return (
    <Button
      className={`${className}`}
      type="submit"
      disabled={isLoading}
    >
      {
        isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            {textLoading ? textLoading : text}
          </>
        ) : (
          <>{text}</>
        )
      }
    </Button>
  )
}
