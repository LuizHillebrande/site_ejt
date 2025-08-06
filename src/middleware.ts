import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Verifica se a rota começa com /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Não aplica proteção na página de login
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Verifica se existe um token de admin
    const token = request.cookies.get("adminToken");
    
    if (!token) {
      // Redireciona para a página de login se não houver token
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

// Configuração para aplicar o middleware apenas nas rotas /admin
export const config = {
  matcher: "/admin/:path*",
}; 