import { poppins } from "@/modules/core/fonts/poppins"
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
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
