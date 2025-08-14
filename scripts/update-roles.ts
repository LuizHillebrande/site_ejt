import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateRoles() {
  try {
    // Atualizar Letícia Costa
    await prisma.teamMember.updateMany({
      where: { name: "Letícia Costa" },
      data: { role: "Diretora de Projetos" }
    });

    // Atualizar Larissa Ramos
    await prisma.teamMember.updateMany({
      where: { name: "Larissa Ramos" },
      data: { role: "Diretora Administrativa" }
    });

    // Atualizar Gabriella Oliveira
    await prisma.teamMember.updateMany({
      where: { name: "Gabriella Oliveira" },
      data: { role: "Consultora" }
    });

    // Atualizar Camila Prado
    await prisma.teamMember.updateMany({
      where: { name: "Camila Prado" },
      data: { role: "Consultora" }
    });

    // Verificar as atualizações
    const members = await prisma.teamMember.findMany();
    console.log('\nMembros atualizados:');
    members.forEach(member => {
      console.log(`- ${member.name}: ${member.role}`);
    });

  } catch (error) {
    console.error('Erro ao atualizar cargos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateRoles(); 