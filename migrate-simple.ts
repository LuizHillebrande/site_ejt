import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function migrateData() {
  try {
    // Migrar membros da equipe
    const teamMembers = [
      {
        name: "Letícia Costa",
        role: "Presidente",
        imageUrl: "/images/equipe/leticia_costa.png",
        active: true
      },
      {
        name: "Larissa Ramos",
        role: "Vice-presidente",
        imageUrl: "/images/equipe/larissa_ramos.png",
        active: true
      },
      {
        name: "Gabriella Oliveira",
        role: "Diretora de Projetos",
        imageUrl: "/images/equipe/gabriella_oliveira.png",
        active: true
      },
      {
        name: "Camila Prado",
        role: "Diretora de Marketing",
        imageUrl: "/images/equipe/camila_prado.png",
        active: true
      }
    ]

    for (const member of teamMembers) {
      await prisma.teamMember.create({
        data: member
      })
    }
    console.log(`✅ Migrados ${teamMembers.length} membros da equipe`)

    // Criar projeto exemplo
    const project = await prisma.project.create({
      data: {
        title: "IPT - Índice de Preços Toledo",
        description: "Pesquisa mensal que monitora os preços da cesta básica em Presidente Prudente desde 1994.",
        status: "em_andamento"
      }
    })
    console.log(`✅ Criado projeto exemplo: ${project.title}`)

    // Criar dados IPT exemplo
    const iptData = await prisma.iptData.create({
      data: {
        maiorPreco: 1200.50,
        menorPreco: 980.30,
        diferenca: 22.5,
        precoMedio: 1090.40,
        anterior: 1050.20,
        atual: 1090.40,
        inflacao: 3.8
      }
    })
    console.log(`✅ Criados dados IPT exemplo`)

    console.log('🎉 Migração concluída com sucesso!')
  } catch (error) {
    console.error('❌ Erro durante a migração:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateData() 