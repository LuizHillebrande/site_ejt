import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

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

    if (!SECTION_FOLDERS[section]) {
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
      // Converter arquivo para base64
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      const dataURI = `data:${file.type};base64,${base64}`;

      // Upload para o Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: SECTION_FOLDERS[section],
        resource_type: 'image',
        // Otimizações automáticas
        quality: 'auto',
        fetch_format: 'auto',
        // Manter proporção original
        aspect_ratio: '1.0',
        // Gerar URLs amigáveis
        public_id: `img_${Date.now()}`,
      });

      return NextResponse.json({ 
        success: true,
        fileName: result.secure_url
      });
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      return NextResponse.json(
        { error: 'Erro ao fazer upload da imagem' },
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