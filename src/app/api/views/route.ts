import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || 'all';

    // Busca total de todas as páginas
    const result = await prisma.pageView.aggregate({
      _sum: {
        views: true
      }
    });
    
    const views = result._sum.views || 0;
    return NextResponse.json({ views });
  } catch (error) {
    console.error('Error fetching views:', error);
    return NextResponse.json(
      { error: 'Failed to fetch views' },
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
        views: 1
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
    console.error('Error registering view:', error);
    return NextResponse.json(
      { error: 'Failed to register view' },
      { status: 500 }
    );
  }
} 