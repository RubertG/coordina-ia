/**
 * Representa los parámetros de búsqueda como una promesa que resuelve a un objeto
 * donde las claves son cadenas y los valores pueden ser cadenas, arreglos de cadenas o indefinidos.
 */
export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

/**
 * Representa un enlace de navegación con una URL y una etiqueta.
 */
export interface NavLink {
  href: string
  label: string
}
