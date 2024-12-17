import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina clases CSS utilizando `clsx` y `twMerge`.
 *
 * @param inputs - Lista de valores de clase.
 * @returns Cadena de clases combinadas.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
