/**
 * Botón para eliminar un proyecto.
 *
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} - Retorna un elemento JSX.
 */

'use client'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/modules/core'
import { deleteProject } from '@/modules/projects'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  idProject: string
}

export const DeleteProjectButton = ({ idProject }: Props) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setLoading(true)
    const { error } = await deleteProject(idProject)

    if (error) {
      toast.error('Ocurrió un error al eliminar el proyecto')
      setLoading(false)
    } else {
      toast.success('Proyecto eliminado correctamente')
      setLoading(false)
      router.push('/')
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">{loading ? 'Eliminando proyecto...' : 'Eliminar proyecto'}</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>¿Estás seguro?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Estás a punto de eliminar un proyecto.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleDelete} variant="destructive">
                Eliminar proyecto
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
