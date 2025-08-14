import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const result = await prisma.pageView.aggregate({
      _sum: {
        views: true
      }
    });

    return NextResponse.json({ views: result._sum.views || 0 });
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
    const { page = 'all' } = await request.json();

    // Cria um novo registro de visualização
    await prisma.pageView.create({
      data: {
        page,
        views: 1,
        viewedAt: new Date()
      }
    });

    // Retorna o total atualizado
    const result = await prisma.pageView.aggregate({
      _sum: {
        views: true
      }
    });

    return NextResponse.json({ views: result._sum.views || 0 });
  } catch (error) {
    console.error('Erro ao registrar visualização:', error);
    return NextResponse.json(
      { error: 'Erro ao registrar visualização' },
      { status: 500 }
    );
  }
} 