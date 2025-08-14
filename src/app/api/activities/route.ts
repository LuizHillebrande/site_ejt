import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });
    return NextResponse.json(activities);
  } catch (error) {
    console.error('Erro ao buscar atividades:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar atividades' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { type, action, details } = await request.json();

    const activity = await prisma.activity.create({
      data: {
        type,
        action,
        details,
        createdAt: new Date()
      }
    });

    // Atualiza a lista de atividades
    const activities = await prisma.activity.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Erro ao registrar atividade:', error);
    return NextResponse.json(
      { error: 'Erro ao registrar atividade' },
      { status: 500 }
    );
  }
} 