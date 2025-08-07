import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { startDate: 'desc' }
  });
  
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const data = await request.json();
  
  const project = await prisma.project.create({
    data: {
      ...data,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null
    }
  });

  return NextResponse.json(project);
} 