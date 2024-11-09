import { SearchParams } from "@/modules/core"
import { use } from "react"

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

interface Props {
  searchParams: SearchParams
}

export default function LoginPage(props: Props) {
  const { error } = use(props.searchParams)

  return (
    <section className="flex flex-col items-center gap-5 justify-center">
      <Tabs defaultValue="register" className="w-[400px]">
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
