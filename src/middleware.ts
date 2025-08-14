import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas que requerem autenticação
const PROTECTED_ROUTES = [
  '/admin/dashboard',
  '/api/team',
  '/api/projects',
  '/api/activities',
  '/api/ipt',
  '/api/upload',
];

// Rotas de API que requerem autenticação
const PROTECTED_API_ROUTES = [
  '/api/team',
  '/api/projects',
  '/api/activities',
  '/api/ipt',
  '/api/upload',
];

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = new URL(request.url);
  const adminToken = request.cookies.get('adminToken');

  // Função para verificar se é uma rota protegida
  const isProtectedRoute = (path: string) => 
    PROTECTED_ROUTES.some(route => path.startsWith(route));

  // Função para verificar se é uma API protegida
  const isProtectedApi = (path: string) =>
    PROTECTED_API_ROUTES.some(route => path.startsWith(route));

  // Verificações específicas para upload de arquivos
  if (pathname === '/api/upload') {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 }
      );
    }
  }

  // Verificar credenciais de login
  if (pathname === '/admin/login' && request.method === 'POST') {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Permitir acesso à página de login
  if (pathname === '/admin/login') {
    if (adminToken?.value === 'logged_in') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Verificar se precisa de autenticação
  const isEditMode = searchParams.get('edit') === 'true';
  const needsAuth = isProtectedRoute(pathname) || isEditMode || pathname.startsWith('/admin');

  if (needsAuth) {
    if (!adminToken || adminToken.value !== 'logged_in') {
      // Se for uma API protegida, retorna 401
      if (isProtectedApi(pathname)) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
      
      // Se estiver em modo de edição, remove o parâmetro e redireciona
      if (isEditMode) {
        const url = new URL(request.url);
        url.searchParams.delete('edit');
        return NextResponse.redirect(url);
      }
      
      // Redireciona para login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Rotas admin
    '/admin/:path*',
    
    // APIs
    '/api/:path*',
    
    // Páginas com modo de edição
    '/servicos',
    '/servicos/:path*',
    '/ipt',
    '/ipt/:path*',
    
    // Qualquer rota com parâmetro edit
    '/:path*'
  ],
}; 