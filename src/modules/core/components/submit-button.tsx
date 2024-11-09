import { Button } from "@/modules/core"
import { Loader2 } from "lucide-react"

interface Props {
  isLoading: boolean
  text: string
  textLoading?: string
}

export const SubmitButton = ({
  isLoading,
  text, 
  textLoading
}: Props) => {
  return (
    <Button
      className="w-full mt-2"
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
