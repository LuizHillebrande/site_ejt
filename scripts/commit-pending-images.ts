import { readFile, writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function commitPendingImages() {
  const logFile = join(process.cwd(), '.pending-images.log');
  
  try {
    // Ler o arquivo de log
    const content = await readFile(logFile, 'utf-8');
    const lines = content.trim().split('\n');
    
    if (lines.length === 0 || (lines.length === 1 && lines[0] === '')) {
      console.log('Nenhuma imagem pendente.');
      return;
    }

    // Agrupar imagens por seção
    const imagesBySection = new Map<string, string[]>();
    
    for (const line of lines) {
      const [, section, path] = line.split('\t');
      if (!imagesBySection.has(section)) {
        imagesBySection.set(section, []);
      }
      imagesBySection.get(section)!.push(path);
    }

    // Adicionar e commitar por seção
    for (const [section, paths] of imagesBySection) {
      // Adicionar todas as imagens da seção
      for (const path of paths) {
        await execAsync(`git add "${path}"`);
      }

      // Criar mensagem de commit
      const commitMessage = paths.length === 1
        ? `feat: adiciona imagem na seção ${section}`
        : `feat: adiciona ${paths.length} imagens na seção ${section}`;

      // Fazer commit
      await execAsync(`git commit -m "${commitMessage}"`);
    }

    // Push para o repositório
    await execAsync('git push');

    // Limpar o arquivo de log
    await writeFile(logFile, '');

    console.log('Imagens commitadas com sucesso!');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao commitar imagens:', error.message);
    } else {
      console.error('Erro ao commitar imagens:', error);
    }
    process.exit(1);
  }
}

// Executar o script
commitPendingImages(); 