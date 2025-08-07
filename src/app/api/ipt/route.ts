import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Busca o registro mais recente
    const data = await prisma.iptData.findFirst({
      orderBy: { updatedAt: 'desc' }
    });

    // Se não houver dados, retorna valores padrão
    if (!data) {
      return NextResponse.json({
        maiorPreco: 0,
        menorPreco: 0,
        diferenca: 0,
        precoMedio: 0,
        anterior: 0,
        atual: 0,
        inflacao: 0
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching IPT data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch IPT data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Valida os campos obrigatórios
    const requiredFields = [
      'maiorPreco',
      'menorPreco',
      'diferenca',
      'precoMedio',
      'anterior',
      'atual',
      'inflacao'
    ];

    for (const field of requiredFields) {
      if (typeof data[field] !== 'number') {
        return NextResponse.json(
          { error: `Campo ${field} é obrigatório e deve ser um número` },
          { status: 400 }
        );
      }
    }

    // Cria um novo registro
    const result = await prisma.iptData.create({
      data: {
        maiorPreco: data.maiorPreco,
        menorPreco: data.menorPreco,
        diferenca: data.diferenca,
        precoMedio: data.precoMedio,
        anterior: data.anterior,
        atual: data.atual,
        inflacao: data.inflacao
      }
    });

    // Registra a atividade
    await prisma.activity.create({
      data: {
        type: 'ipt',
        action: 'update',
        details: 'Dados do IPT atualizados'
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating IPT data:', error);
    return NextResponse.json(
      { error: 'Failed to update IPT data' },
      { status: 500 }
    );
  }
} 