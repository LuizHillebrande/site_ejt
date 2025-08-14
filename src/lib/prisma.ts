import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['error', 'warn'],
    // Adiciona retry na conexão
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  }).$extends({
    query: {
      $allOperations({ operation, model, args, query }) {
        // Adiciona retry nas queries
        const maxRetries = 3;
        const retryDelay = 1000; // 1 segundo

        return async () => {
          for (let i = 0; i < maxRetries; i++) {
            try {
              return await query(args);
            } catch (error: any) {
              // Se for o último retry, lança o erro
              if (i === maxRetries - 1) throw error;

              // Se for erro de conexão, espera e tenta novamente
              if (error?.message?.includes('Connection')) {
                console.warn(`Retry ${i + 1}/${maxRetries} for ${model}.${operation}`);
                await new Promise(resolve => setTimeout(resolve, retryDelay * (i + 1)));
                continue;
              }

              // Se for outro tipo de erro, lança
              throw error;
            }
          }
        };
      },
    },
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Função para aquecer a conexão
export async function warmupPrisma() {
  try {
    // Faz uma query simples para estabelecer conexão
    await prisma.$queryRaw`SELECT 1`;
    console.log('Prisma connection warmed up');
  } catch (error) {
    console.error('Error warming up Prisma connection:', error);
  }
}

export { prisma }; 