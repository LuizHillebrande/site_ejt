import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Log das configurações (sem expor secrets)
console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  hasApiKey: !!process.env.CLOUDINARY_API_KEY,
  hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
});

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Tipos de arquivo permitidos
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
] as const;

// Tamanho máximo: 5MB
const MAX_SIZE = 5 * 1024 * 1024;

// Mapeia a seção para a pasta no Cloudinary
const SECTION_FOLDERS = {
  'servicos': 'ejt/servicos',
  'ipt': 'ejt/ipt',
} as const;

type Section = keyof typeof SECTION_FOLDERS;

export async function POST(request: Request) {
  try {
    // Log do início do upload
    console.log('Iniciando upload de imagem...');

    // Validar Content-Type
    const contentType = request.headers.get('content-type');
    console.log('Content-Type:', contentType);

    if (!contentType?.includes('multipart/form-data')) {
      console.log('Erro: Content-Type inválido');
      return NextResponse.json(
        { error: 'Content-Type deve ser multipart/form-data' },
        { status: 400 }
      );
    }

    let formData;
    try {
      formData = await request.formData();
      console.log('FormData recebido:', {
        hasFile: !!formData.get('file'),
        section: formData.get('section'),
      });
    } catch (e) {
      console.error('Erro ao processar FormData:', e);
      return NextResponse.json(
        { error: 'Erro ao processar formulário' },
        { status: 400 }
      );
    }

    const file = formData.get('file') as File;
    const section = formData.get('section') as Section;

    if (!file || !section) {
      console.log('Erro: Arquivo ou seção faltando', { hasFile: !!file, section });
      return NextResponse.json(
        { error: 'Arquivo e seção são obrigatórios' },
        { status: 400 }
      );
    }

    if (!SECTION_FOLDERS[section]) {
      console.log('Erro: Seção inválida', { section });
      return NextResponse.json(
        { error: 'Seção inválida' },
        { status: 400 }
      );
    }

    // Log dos detalhes do arquivo
    console.log('Detalhes do arquivo:', {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Validar tipo do arquivo
    if (!ALLOWED_TYPES.includes(file.type as any)) {
      console.log('Erro: Tipo de arquivo não permitido', { type: file.type });
      return NextResponse.json(
        { error: 'Tipo de arquivo não permitido. Apenas imagens são aceitas.' },
        { status: 400 }
      );
    }

    // Validar tamanho
    if (file.size > MAX_SIZE) {
      console.log('Erro: Arquivo muito grande', { size: file.size, maxSize: MAX_SIZE });
      return NextResponse.json(
        { error: 'Arquivo muito grande. Máximo de 5MB.' },
        { status: 400 }
      );
    }

    try {
      console.log('Preparando upload para o Cloudinary...');
      // Converter arquivo para base64
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      const dataURI = `data:${file.type};base64,${base64}`;

      console.log('Iniciando upload no Cloudinary para a pasta:', SECTION_FOLDERS[section]);
      // Upload para o Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: SECTION_FOLDERS[section],
        resource_type: 'image',
        // Otimizações automáticas
        quality: 'auto',
        fetch_format: 'auto',
        // Manter proporção e limitar tamanho máximo
        transformation: [
          { width: 1200, crop: 'limit' },
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      });

      console.log('Upload concluído com sucesso:', {
        publicId: result.public_id,
        url: result.secure_url,
      });

      return NextResponse.json({ 
        success: true,
        fileName: result.secure_url
      });
    } catch (error) {
      // Log detalhado do erro do Cloudinary
      console.error('Erro detalhado do upload:', {
        error,
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        stack: error instanceof Error ? error.stack : undefined,
        details: error instanceof Object ? JSON.stringify(error) : undefined,
      });

      return NextResponse.json(
        { error: `Erro ao fazer upload da imagem: ${error instanceof Error ? error.message : 'Erro desconhecido'}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erro inesperado no upload:', {
      error,
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: `Erro interno do servidor: ${error instanceof Error ? error.message : 'Erro desconhecido'}` },
      { status: 500 }
    );
  }
} 