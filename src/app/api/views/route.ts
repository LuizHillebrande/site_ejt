import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const views = await prisma.pageView.aggregate({
      _sum: {
        views: true
      }
    });

    return NextResponse.json({ 
      total: views._sum.views || 0 
    });
  } catch (error) {
    console.error('Erro ao buscar visualizações:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar visualizações' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Validar Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type deve ser application/json' },
        { status: 400 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { error: 'JSON inválido' },
        { status: 400 }
      );
    }

    const { page } = body;

    // Validar página
    if (!page || typeof page !== 'string') {
      return NextResponse.json(
        { error: 'Página é obrigatória e deve ser uma string' },
        { status: 400 }
      );
    }

    // Limitar tamanho da string da página
    if (page.length > 100) {
      return NextResponse.json(
        { error: 'Nome da página muito longo' },
        { status: 400 }
      );
    }

    try {
      await prisma.pageView.create({
        data: {
          page,
          views: 1
        }
      });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Erro ao registrar visualização:', error);
      return NextResponse.json(
        { error: 'Erro ao registrar visualização' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erro inesperado:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 