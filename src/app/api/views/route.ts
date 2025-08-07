import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { page } = await request.json();
  
  const pageView = await prisma.pageView.create({
    data: { page }
  });

  return NextResponse.json(pageView);
}

export async function GET() {
  const totalViews = await prisma.pageView.count();
  const viewsByPage = await prisma.pageView.groupBy({
    by: ['page'],
    _count: true,
  });

  return NextResponse.json({ total: totalViews, byPage: viewsByPage });
} 