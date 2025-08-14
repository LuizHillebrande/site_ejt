import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Limpa os dados existentes
  await prisma.teamMember.deleteMany()
  await prisma.project.deleteMany()
  await prisma.pageView.deleteMany()

  // Cria um registro inicial de views
  await prisma.pageView.create({
    data: {
      page: 'all',
      views: 1
    }
  });

  // Adiciona os membros da equipe
  const members = [
    { 
      name: "Letícia Costa", 
      role: "Diretora de projetos", 
      imageUrl: "/images/equipe/leticia_costa.png",
      active: true
    },
    { 
      name: "Larissa Ramos", 
      role: "Diretora Administrativa", 
      imageUrl: "/images/equipe/larissa_ramos.png",
      active: true
    },
    { 
      name: "Gabriella Oliveira", 
      role: "Consultora", 
      imageUrl: "/images/equipe/gabriella_oliveira.png",
      active: true
    },
    { 
      name: "Camila Prado", 
      role: "Consultora", 
      imageUrl: "/images/equipe/camila_prado.png",
      active: true
    },
  ]

  for (const member of members) {
    await prisma.teamMember.create({
      data: member
    })
  }

  console.log('Database has been seeded. 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 