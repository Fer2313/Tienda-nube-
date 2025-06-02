import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

const verifySession = async (token: string) => {
  try {
    await axios.get(
      process.env.NEXT_PUBLIC_API_URL + '/api/auth/verify-session',
      {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token aquí
        },
        withCredentials: true,
      },
    )
    return true
  } catch (error) {
    if (error) {
      console.log(error)
      return false
    }
  }
}

export const middleware = async (req: NextRequest) => {
  const url = req.nextUrl.clone()

  // Obtener el valor de la cookie del token
  const tokenCookie = req.cookies.get('jwt')?.value // Obtener el valor de la cookie
  console.log(tokenCookie)
  let session
  if (typeof tokenCookie === 'string') {
    session = await verifySession(tokenCookie)
  }

  console.log('Token Cookie:', tokenCookie, 'Session:', session)

  // Si hay un token
  if (session) {
    // Si el usuario está autenticado y trata de acceder a login o register, redirigir al home
    if (
      url.pathname.startsWith('/login') ||
      url.pathname.startsWith('/register')
    ) {
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  } else {
    // Si no hay token y el usuario intenta acceder a rutas protegidas, redirigir al login
    if (
      url.pathname.startsWith('/dashboard') ||
      url.pathname.startsWith('/profile') ||
      url.pathname.startsWith('/cart')
    ) {
      // Si ya estás en la página de login, evita redirigir de nuevo
      if (!url.pathname.startsWith('/login')) {
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }
    }
  }

  // Continuar con la solicitud si no se cumple ninguna condición anterior
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/dashboard/:path*',
    '/cart/:path*',
    '/profile/:path*',
  ],
}
