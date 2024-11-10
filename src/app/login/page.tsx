import { createClientServer, SearchParams } from "@/modules/core"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/modules/core"
import { RegisterForm, SiginForm } from "@/modules/auth"
import { redirect } from "next/navigation"

interface Props {
  searchParams: SearchParams
}

export default async function LoginPage(props: Props) {
  const supabase = await createClientServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  const { error } = await props.searchParams

  return (
    <section className="flex flex-col items-center gap-5 justify-center">
      <Tabs defaultValue="register" className="w-full max-w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="register">Registrar</TabsTrigger>
          <TabsTrigger value="sigin">Ingresar</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardDescription>
                Ingrese sus datos para crear una cuenta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <RegisterForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sigin">
          <Card>
            <CardHeader>
              <CardDescription>
                Ingrese sus datos para entrar a su cuenta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SiginForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {
        error && (
          <p className="bg-red-500 text-white py-1.5 px-4 rounded-full text-sm">
            {error}
          </p>
        )
      }
    </section>
  )
}
