/**
 * Formulario para la creación de un nuevo proyecto con selección de trabajadores.
 *
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} - Retorna un elemento JSX.
 */

'use client'

import {
  Card,
  CardContent,
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

import { useWorkerForm } from '../hooks/use-worker-form'

interface Props {
  className?: string
}

export const CreateWorkerForm = ({ className }: Props) => {
  const { form, handlesubmit, loading } = useWorkerForm({
    worker: {
      nombre: '',
      curriculum: '',
    },
  })

  return (
    <section className={`flex items-center justify-center ${className}`}>
      <Card className="w-full md:max-w-[600px]">
        <CardContent className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handlesubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del trabajdor</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Pepito Perez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="curriculum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción del proyecto</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Pon el texto del curriculum del trabajador"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <footer className="!mt-6 flex flex-wrap gap-3">
                <SubmitButton
                  className="w-auto"
                  text="Guardar trabajador"
                  textLoading="Guardando trabajador"
                  isLoading={loading}
                />
              </footer>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  )
}
