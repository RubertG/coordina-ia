import { poppins, Footer, Nav, Toaster } from '@/modules/core'
import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coordina IA - Gestiona tus equipos de desarrollo',
  description:
    'Gestiona de mejor manera tus integrantes de equipos de desarrollo con Coordina IA, a partir de recomendaciones basadas en sus habilidades tecnológicas y blandas.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.className} bg-zinc-50 antialiased dark:bg-zinc-950`}>
        <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
          <Nav />
          <main className="mx-auto my-10 w-full max-w-7xl px-4">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
