import { NextResponse } from 'next/server';
import { writeFile, mkdir, appendFile } from 'fs/promises';
import { join } from 'path';

// Tipos de arquivo permitidos
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
] as const;

// Tamanho máximo: 5MB
const MAX_SIZE = 5 * 1024 * 1024;

// Mapeia a seção para o diretório correto
const SECTION_DIRS = {
  'servicos': 'public/images/servicos',
  'ipt': 'public/images/ipt/carrousel',
} as const;

type Section = keyof typeof SECTION_DIRS;

// Arquivo de log para imagens pendentes de commit
const PENDING_IMAGES_LOG = join(process.cwd(), '.pending-images.log');

export async function POST(request: Request) {
  try {
    // Validar Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Content-Type deve ser multipart/form-data' },
        { status: 400 }
      );
    }

    let formData;
    try {
      formData = await request.formData();
    } catch (e) {
      return NextResponse.json(
        { error: 'Erro ao processar formulário' },
        { status: 400 }
      );
    }

    const file = formData.get('file') as File;
    const section = formData.get('section') as Section;

    if (!file || !section) {
      return NextResponse.json(
        { error: 'Arquivo e seção são obrigatórios' },
        { status: 400 }
      );
    }

    if (!SECTION_DIRS[section]) {
      return NextResponse.json(
        { error: 'Seção inválida' },
        { status: 400 }
      );
    }

    // Validar tipo do arquivo
    if (!ALLOWED_TYPES.includes(file.type as any)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo não permitido. Apenas imagens são aceitas.' },
        { status: 400 }
      );
    }

    // Validar tamanho
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Máximo de 5MB.' },
        { status: 400 }
      );
    }

    try {
      // Gerar nome único mantendo a extensão original
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8);
      const extension = file.name.split('.').pop();
      const fileName = `img_${timestamp}_${randomString}.${extension}`;
      
      // Garantir que o diretório existe
      const uploadDir = join(process.cwd(), SECTION_DIRS[section]);
      await mkdir(uploadDir, { recursive: true });
      
      // Caminho completo do arquivo
      const path = join(uploadDir, fileName);

      // Converter arquivo para ArrayBuffer e salvar
      const bytes = await file.arrayBuffer();
      await writeFile(path, new Uint8Array(bytes));

      // Adicionar ao log de imagens pendentes
      const relativePath = path.replace(process.cwd() + '/', '');
      const logEntry = `${new Date().toISOString()}\t${section}\t${relativePath}\n`;
      await appendFile(PENDING_IMAGES_LOG, logEntry);

      // Retorna o caminho relativo da imagem (para usar no src)
      const imageUrl = `/${SECTION_DIRS[section].replace('public/', '')}/${fileName}`;
      return NextResponse.json({ 
        success: true,
        fileName: imageUrl
      });
    } catch (error) {
      console.error('Erro ao salvar arquivo:', error);
      return NextResponse.json(
        { error: 'Erro ao salvar arquivo' },
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