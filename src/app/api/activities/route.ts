import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const activities = await prisma.activity.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  
  return NextResponse.json(activities);
}

export async function POST(request: Request) {
  const data = await request.json();
  
  const activity = await prisma.activity.create({
    data: {
      type: data.type,
      action: data.action,
      details: data.details
    }
  });

  return NextResponse.json(activity);
} 