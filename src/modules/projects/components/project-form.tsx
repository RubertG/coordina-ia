import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, SubmitButton, Textarea } from "@/modules/core"
import { createProjectSchemaType } from "../types/types"
import { UseFormReturn } from "react-hook-form"

interface Props {
  form: UseFormReturn<createProjectSchemaType>
  isLoading: boolean
  handlesubmit: (data: createProjectSchemaType) => Promise<void>
}

const ProjectForm = ({
  form, handlesubmit, isLoading
}: Props) => {
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
                <Input placeholder="Ej: 5" type='number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <footer className='flex gap-3 flex-wrap !mt-6'>
          <SubmitButton
            className="w-auto"
            text="Guardar proyecto"
            textLoading="Guardando proyecto"
            isLoading={isLoading}
          />
          <Button variant="ghost" type='button'>
            Cargar mejores trabajadores
          </Button>
        </footer>
      </form>
    </Form>
  )
}

export { ProjectForm }
