import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanTestMembers() {
  try {
    // Deletar membros com nomes de teste
    const deleted = await prisma.teamMember.deleteMany({
      where: {
        OR: [
          { name: { contains: 'Teste' } },
          { name: { contains: 'Test' } },
          { role: { contains: 'Teste' } },
          { role: { contains: 'Test' } },
          { name: 'Membro Teste' },
          { role: 'Cargo Teste' },
        ]
      }
    });

    console.log(`Deletados ${deleted.count} membros de teste`);

    // Mostrar membros restantes
    const remaining = await prisma.teamMember.findMany();
    console.log('\nMembros restantes:');
    remaining.forEach(member => {
      console.log(`- ${member.name} (${member.role})`);
    });

  } catch (error) {
    console.error('Erro ao limpar membros:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanTestMembers(); 