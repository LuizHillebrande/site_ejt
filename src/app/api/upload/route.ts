import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    const urls = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Gera um nome único para o arquivo
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileName = `${timestamp}-${randomString}-${file.name}`;

        // Define o caminho onde a imagem será salva
        const path = join(process.cwd(), 'public/uploads', fileName);
        
        // Salva o arquivo
        await writeFile(path, buffer);

        // Retorna a URL relativa
        return `/uploads/${fileName}`;
      })
    );

    return NextResponse.json({ urls });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
} 