export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export interface NavLink {
  href: string
  label: string
}