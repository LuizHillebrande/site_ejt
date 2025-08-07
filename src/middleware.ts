import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('adminToken');
  const { pathname, searchParams } = new URL(request.url);

  // Se estiver tentando acessar o login e já estiver logado, redireciona para o dashboard
  if (pathname === '/admin/login' && adminToken?.value === 'logged_in') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Se estiver tentando acessar uma rota admin ou uma página em modo de edição
  if (
    pathname.startsWith('/admin') || 
    (searchParams.get('edit') === 'true' && (pathname === '/servicos' || pathname === '/ipt'))
  ) {
    // Se não estiver logado ou o token for inválido
    if (!adminToken || adminToken.value !== 'logged_in') {
      // Se estava tentando editar uma página, redireciona para a mesma página sem o modo de edição
      if (searchParams.get('edit') === 'true') {
        const url = new URL(request.url);
        url.searchParams.delete('edit');
        return NextResponse.redirect(url);
      }
      
      // Se estava tentando acessar uma rota admin, redireciona para o login
      return NextResponse.redirect(new URL('/admin/login', request.url));
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