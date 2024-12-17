/**
 * SubmitButton Component
 *
 * Este componente representa un botón de envío que puede mostrar un estado de carga.
 *
 * Props:
 * - isLoading (boolean): Indica si el botón está en estado de carga.
 * - text (string): El texto a mostrar en el botón.
 * - textLoading (string, opcional): El texto a mostrar cuando el botón está en estado de carga.
 * - className (string, opcional): Clases CSS adicionales para el botón.
 */

import { Button } from '@/modules/core'
import { Loader2 } from 'lucide-react'

interface Props {
  isLoading: boolean
  text: string
  textLoading?: string
  className?: string
}

export const SubmitButton = ({ isLoading, text, textLoading, className }: Props) => {
  return (
    <Button className={`${className}`} type="submit" disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          {textLoading ? textLoading : text}
        </>
      ) : (
        <>{text}</>
      )}
    </Button>
  )
}
