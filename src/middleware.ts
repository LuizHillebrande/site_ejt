import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Verifica se já está logado ao tentar acessar a página de login
  if (request.nextUrl.pathname === "/admin/login") {
    const token = request.cookies.get("adminToken");
    if (token) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Proteção das rotas administrativas
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("adminToken");
    
    if (!token || token.value !== "logged_in") {
      // Remove o cookie inválido se existir
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("adminToken");
      return response;
    }
  }

  return NextResponse.next();
}

// Configuração para aplicar o middleware apenas nas rotas /admin
export const config = {
  matcher: [
    "/admin/:path*"
  ]
}; 