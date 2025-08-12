import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('adminToken');
  const { pathname } = new URL(request.url);

  // Se estiver na página de login
  if (pathname === '/admin/login') {
    // Se já estiver logado, redireciona para o dashboard
    if (adminToken?.value === 'logged_in') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    // Se não estiver logado, permite acessar a página de login
    return NextResponse.next();
  }

  // Para todas as outras rotas admin
  if (pathname.startsWith('/admin')) {
    // Se não estiver logado, redireciona para o login
    if (!adminToken || adminToken.value !== 'logged_in') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Para páginas com modo de edição
  if (request.nextUrl.searchParams.get('edit') === 'true') {
    // Se não estiver logado, remove o parâmetro edit
    if (!adminToken || adminToken.value !== 'logged_in') {
      const url = new URL(request.url);
      url.searchParams.delete('edit');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/servicos',
    '/ipt'
  ]
}; 