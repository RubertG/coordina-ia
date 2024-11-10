import { poppins, Footer, Nav } from "@/modules/core"
import "./globals.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Coordina IA - Gestiona tus equipos de desarrollo",
  description: "Gestiona de mejor manera tus integrantes de equipos de desarrollo con Coordina IA, a partir de recomendaciones basadas en sus habilidades tecnológicas y blandas.",
  icons: {
    icon: "/favicon.ico"
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.className} bg-zinc-50 dark:bg-zinc-950 antialiased`}>
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
          <Nav />
          <main className="w-full max-w-7xl mx-auto px-4 my-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
