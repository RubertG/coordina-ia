import { Poppins } from 'next/font/google'

/**
 * Configura la fuente Poppins desde Google Fonts con diferentes pesos y un subconjunto latino.
 */
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})
