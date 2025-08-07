import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

interface ImageData {
  page: string;
  section: string;
  images: string[];
}

export async function POST(request: Request) {
  try {
    const data: ImageData = await request.json();
    const { page, section, images } = data;

    // Caminho do arquivo de configuração
    const configPath = join(process.cwd(), 'src/config/images.json');

    // Lê a configuração atual ou cria uma nova
    let config = {};
    try {
      const configContent = await readFile(configPath, 'utf-8');
      config = JSON.parse(configContent);
    } catch (error) {
      // Se o arquivo não existir, continua com o objeto vazio
    }

    // Atualiza a configuração
    config = {
      ...config,
      [page]: {
        ...(config as any)[page],
        [section]: images
      }
    };

    // Salva a nova configuração
    await writeFile(configPath, JSON.stringify(config, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving images:', error);
    return NextResponse.json(
      { error: 'Error saving images' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const section = searchParams.get('section');

    if (!page || !section) {
      return NextResponse.json(
        { error: 'Missing page or section parameter' },
        { status: 400 }
      );
    }

    // Lê a configuração
    const configPath = join(process.cwd(), 'src/config/images.json');
    const configContent = await readFile(configPath, 'utf-8');
    const config = JSON.parse(configContent);

    // Retorna as imagens da seção específica
    const images = config?.[page]?.[section] || [];

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading images:', error);
    return NextResponse.json(
      { error: 'Error reading images' },
      { status: 500 }
    );
  }
} 