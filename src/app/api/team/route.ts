import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Buscando membros da equipe...');
    const members = await prisma.teamMember.findMany({
      orderBy: {
        id: 'asc'
      }
    });
    console.log('Membros encontrados:', members);
    return NextResponse.json(members);
  } catch (error) {
    console.error('Erro ao buscar membros:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar membros' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  
  const member = await prisma.teamMember.create({
    data
  });

  return NextResponse.json(member);
}

export async function PUT(request: Request) {
  const { id, ...data } = await request.json();
  
  const member = await prisma.teamMember.update({
    where: { id: Number(id) },
    data
  });

  return NextResponse.json(member);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  
  await prisma.teamMember.delete({
    where: { id: Number(id) }
  });

  return NextResponse.json({ success: true });
} 