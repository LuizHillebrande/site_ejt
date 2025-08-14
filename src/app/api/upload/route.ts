import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

// Tipos de arquivo permitidos
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
];

// Tamanho máximo: 5MB
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    console.log('Iniciando upload de arquivo...');

    // Validar Content-Type
    const contentType = request.headers.get('content-type');
    console.log('Content-Type:', contentType);

    if (!contentType?.includes('multipart/form-data')) {
      console.error('Content-Type inválido:', contentType);
      return NextResponse.json(
        { error: 'Content-Type deve ser multipart/form-data' },
        { status: 400 }
      );
    }

    let formData;
    try {
      formData = await request.formData();
      console.log('FormData recebido');
    } catch (e) {
      console.error('Erro ao processar formData:', e);
      return NextResponse.json(
        { error: 'Erro ao processar formulário' },
        { status: 400 }
      );
    }

    const file = formData.get('file') as File;
    if (!file) {
      console.error('Nenhum arquivo recebido');
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    console.log('Arquivo recebido:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Validar tipo do arquivo
    if (!ALLOWED_TYPES.includes(file.type)) {
      console.error('Tipo de arquivo não permitido:', file.type);
      return NextResponse.json(
        { error: 'Tipo de arquivo não permitido. Apenas imagens são aceitas.' },
        { status: 400 }
      );
    }

    // Validar tamanho
    if (file.size > MAX_SIZE) {
      console.error('Arquivo muito grande:', file.size);
      return NextResponse.json(
        { error: 'Arquivo muito grande. Máximo de 5MB.' },
        { status: 400 }
      );
    }

    try {
      // Gerar nome único
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileName = `${timestamp}-${randomString}-${file.name.toLowerCase().replace(/[^a-z0-9.]/g, '_')}`;
      
      // Garantir que o diretório existe
      const uploadDir = join(process.cwd(), 'public/uploads');
      await mkdir(uploadDir, { recursive: true });
      
      // Caminho completo do arquivo
      const path = join(uploadDir, fileName);
      console.log('Salvando arquivo em:', path);

      // Converter arquivo para ArrayBuffer e salvar
      const bytes = await file.arrayBuffer();
      await writeFile(path, new Uint8Array(bytes));
      console.log('Arquivo salvo com sucesso');

      return NextResponse.json({ 
        success: true,
        fileName: `/uploads/${fileName}` 
      });
    } catch (error) {
      console.error('Erro ao salvar arquivo:', error);
      return NextResponse.json(
        { error: 'Erro ao salvar arquivo no servidor' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erro inesperado no upload:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 