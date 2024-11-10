"use client"

import { Button, Card, CardContent, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, SubmitButton, Textarea } from '@/modules/core'
import { createProjectSchema, createProjectSchemaType } from '@/modules/projects'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  className?: string
}

export const CreateProjectForm = ({
  className
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<createProjectSchemaType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      maxWorkers: "0",
      technologies: ""
    }
  })

  const handlesubmit = async (data: createProjectSchemaType) => {
    setIsLoading(true)
    console.log(data)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="mt-4">
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

            <footer className='flex gap-3 !mt-6'>
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
      </CardContent>
    </Card>
  )
}
