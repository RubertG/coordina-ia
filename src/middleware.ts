/**
 * Middleware para actualizar la sesión del usuario.
 *
 * @param {NextRequest} request - La solicitud entrante de Next.js.
 * @returns {Promise<Response>} - La respuesta de la actualización de la sesión.
 */

import { updateSession } from '@/modules/core'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

/**
 * Configuración del middleware.
 *
 * Define las rutas en las que se aplicará este middleware, excluyendo ciertas rutas y archivos estáticos.
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
