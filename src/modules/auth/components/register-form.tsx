'use client'

import { registerSchemaType, signup } from '@/modules/auth'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, SubmitButton } from '@/modules/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { loginSchema } from '../schemas/register'

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm<registerSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handlesubmit = async (data: registerSchemaType) => {
    setIsLoading(true)
    const res = await signup(data)

    if (res.error) router.replace(`/login?error=${res.error}`)

    setIsLoading(false)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlesubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: tunombre@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input placeholder="Tu contraseña" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <footer>
            <SubmitButton
              className="mt-2 w-full"
              text="Crear cuenta"
              textLoading="Creando cuenta"
              isLoading={isLoading}
            />
          </footer>
        </form>
      </Form>
    </>
  )
}
