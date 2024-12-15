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
import React from 'react'

interface Props {
  idProject: string
}

export const DeleteProjectButton = ({ idProject }: Props) => {
  const handleDelete = () => {
    console.log(idProject)
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">Eliminar proyecto</Button>
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
