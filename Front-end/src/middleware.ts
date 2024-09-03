import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const middleware = async (req: NextRequest) => {
  const url = req.nextUrl.clone();
  
  // Obtener el valor de la cookie del token
  const tokenCookie = req.cookies.get('jwt');

  // Si hay un token, redirige según las rutas
  if (tokenCookie) {
    // Si el usuario está autenticado y trata de acceder a login o register, redirigir al home
    if (url.pathname.startsWith('/login') || url.pathname.startsWith('/register')) {
      url.pathname = '/';
      return NextResponse.redirect(url);
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
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }
    }
  }

  // Continuar con la solicitud si no se cumple ninguna condición anterior
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/cart/:path*",
    "/profile/:path*",
  ],
};
