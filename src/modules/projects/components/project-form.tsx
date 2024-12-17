'use client'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  SubmitButton,
  Textarea,
} from '@/modules/core'
import { UseFormReturn } from 'react-hook-form'

import { ProjectCreationSchema } from '../types/types'

interface Props {
  form: UseFormReturn<ProjectCreationSchema>
  isLoading: boolean
  handlesubmit: (data: ProjectCreationSchema) => Promise<void>
  loadWorkers: () => void
}

const ProjectForm = ({ form, handlesubmit, isLoading, loadWorkers }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handlesubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del proyecto</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Desarrollo landing page" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción del proyecto</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escribe una descripción detallada de lo que se hará en el proyecto"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tecnologías</FormLabel>
              <FormControl>
                <Input placeholder="Ej: React, Next.js, TailwindCSS" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxWorkers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad máxima de trabajadores</FormLabel>
              <FormControl>
                <Input placeholder="Ej: 5" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <footer className="!mt-6 flex flex-wrap gap-3">
          <SubmitButton
            className="w-auto"
            text="Guardar proyecto"
            textLoading="Guardando proyecto"
            isLoading={isLoading}
          />
          <Button variant="ghost" type="button" onClick={loadWorkers}>
            Cargar mejores trabajadores
          </Button>
        </footer>
      </form>
    </Form>
  )
}

export { ProjectForm }
