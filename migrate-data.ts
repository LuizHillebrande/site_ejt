import { PrismaClient as PrismaClientPostgres } from '@prisma/client'
import { PrismaClient as PrismaClientSqlite } from '@prisma/client'

// Cliente para o banco PostgreSQL (novo)
const postgresClient = new PrismaClientPostgres({
  datasources: {
    db: {
      url: "postgresql://neondb_owner:npg_8iYCWtuXyI6v@ep-wild-wind-ac55n019-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    }
  }
})

// Cliente para o banco SQLite (antigo)
const sqliteClient = new PrismaClientSqlite({
  datasources: {
    db: {
      url: "file:./prisma/dev.db"
    }
  }
})

async function migrateData() {
  try {
    // Migrar membros da equipe
    const teamMembers = await sqliteClient.teamMember.findMany()
    for (const member of teamMembers) {
      await postgresClient.teamMember.create({
        data: {
          name: member.name,
          role: member.role,
          imageUrl: member.imageUrl,
          active: member.active,
          createdAt: member.createdAt,
          updatedAt: member.updatedAt
        }
      })
    }
    console.log(`✅ Migrados ${teamMembers.length} membros da equipe`)

    // Migrar projetos
    const projects = await sqliteClient.project.findMany()
    for (const project of projects) {
      await postgresClient.project.create({
        data: {
          title: project.title,
          description: project.description,
          status: project.status,
          startDate: project.startDate,
          endDate: project.endDate,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt
        }
      })
    }
    console.log(`✅ Migrados ${projects.length} projetos`)

    // Migrar dados do IPT
    const iptData = await sqliteClient.iptData.findMany()
    for (const ipt of iptData) {
      await postgresClient.iptData.create({
        data: {
          maiorPreco: ipt.maiorPreco,
          menorPreco: ipt.menorPreco,
          diferenca: ipt.diferenca,
          precoMedio: ipt.precoMedio,
          anterior: ipt.anterior,
          atual: ipt.atual,
          inflacao: ipt.inflacao,
          updatedAt: ipt.updatedAt
        }
      })
    }
    console.log(`✅ Migrados ${iptData.length} registros de IPT`)

    // Migrar visualizações de página
    const pageViews = await sqliteClient.pageView.findMany()
    for (const view of pageViews) {
      await postgresClient.pageView.create({
        data: {
          page: view.page,
          views: view.views,
          viewedAt: view.viewedAt
        }
      })
    }
    console.log(`✅ Migrados ${pageViews.length} registros de visualizações`)

    // Migrar atividades
    const activities = await sqliteClient.activity.findMany()
    for (const activity of activities) {
      await postgresClient.activity.create({
        data: {
          type: activity.type,
          action: activity.action,
          details: activity.details,
          createdAt: activity.createdAt
        }
      })
    }
    console.log(`✅ Migrados ${activities.length} registros de atividades`)

    console.log('🎉 Migração concluída com sucesso!')
  } catch (error) {
    console.error('❌ Erro durante a migração:', error)
  } finally {
    await sqliteClient.$disconnect()
    await postgresClient.$disconnect()
  }
}

// Executar a migração
migrateData() 