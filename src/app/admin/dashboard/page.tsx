"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ChartBarIcon, 
  UsersIcon, 
  DocumentTextIcon, 
  CalendarIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  UserGroupIcon,
  DocumentIcon
} from '@heroicons/react/24/outline';
import { usePageViews } from '@/hooks/usePageViews';
import NewProjectModal from '@/components/admin/NewProjectModal';
import NewMemberModal from '@/components/admin/NewMemberModal';
import NewEventModal from '@/components/admin/NewEventModal';
import GenerateReportModal from '@/components/admin/GenerateReportModal';
import CountUp from 'react-countup';
import TeamSection from '@/components/admin/TeamSection';
import ProjectsSection from '@/components/admin/ProjectsSection';
import EventsSection from '@/components/admin/EventsSection';
import { TeamMember, Project, Event, Activity } from '@/types/admin';

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const totalViews = usePageViews('all');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<'dashboard' | 'team' | 'projects' | 'events'>('dashboard');
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Verificação de autenticação no lado do cliente
    const token = getCookie('adminToken');
    if (!token || token !== 'logged_in') {
      router.replace('/admin/login');
      return;
    }
    setIsLoading(false);

    // Carrega dados apenas se estiver autenticado
    fetch('/api/team')
      .then(res => res.json())
      .then(setMembers);

    fetch('/api/projects')
      .then(res => res.json())
      .then(setProjects);

    // Carrega atividades recentes
    fetch('/api/activities')
      .then(res => res.json())
      .then(setActivities);
  }, [router]);

  const activeProjects = projects.filter(p => p.status === 'em_andamento');
  const activeMembers = members.filter(m => m.active);

  const handleLogout = () => {
    document.cookie = "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.replace("/admin/login");
  };

  const registerActivity = async (type: string, action: string, details: string) => {
    const response = await fetch('/api/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, action, details })
    });

    if (response.ok) {
      // Atualiza a lista de atividades
      const newActivity = await response.json();
      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }
  };

  const handleNewProject = async (data: { title: string; description: string }) => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        status: 'em_andamento',
        startDate: new Date(),
      })
    });

    if (response.ok) {
      const project = await response.json();
      setProjects(prev => [...prev, project]);
      await registerActivity('project', 'create', `Novo projeto criado: ${data.title}`);
    }
  };

  const handleNewMember = async (data: { name: string; role: string }) => {
    const response = await fetch('/api/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        active: true
      })
    });

    if (response.ok) {
      const member = await response.json();
      setMembers(prev => [...prev, member]);
      await registerActivity('team', 'create', `Novo membro adicionado: ${data.name} (${data.role})`);
    }
  };

  const handleNewEvent = async (data: { name: string; date: string; description: string }) => {
    await registerActivity('event', 'create', `Novo evento agendado: ${data.name} para ${new Date(data.date).toLocaleDateString()}`);
  };

  const handleGenerateReport = async (data: { type: string; period: string }) => {
    await registerActivity('report', 'create', `Relatório gerado: ${data.type} - ${data.period}`);
    alert('Relatório gerado com sucesso!');
  };

  const handleDeleteMember = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este membro?')) return;

    const response = await fetch(`/api/team/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      setMembers(prev => prev.filter(m => m.id !== id));
      await registerActivity('team', 'delete', `Membro removido da equipe`);
    }
  };

  const handleToggleMemberStatus = async (id: number, active: boolean) => {
    const response = await fetch(`/api/team/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active })
    });

    if (response.ok) {
      setMembers(prev => prev.map(m => m.id === id ? { ...m, active } : m));
      await registerActivity(
        'team', 
        'update', 
        `Status do membro atualizado para ${active ? 'ativo' : 'inativo'}`
      );
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      setProjects(prev => prev.filter(p => p.id !== id));
      await registerActivity('project', 'delete', `Projeto removido`);
    } else {
      alert('Erro ao excluir projeto');
    }
  };

  const handleCompleteProject = async (id: number) => {
    const now = new Date().toISOString();
    const response = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        status: 'concluido' as const,
        endDate: now
      })
    });

    if (response.ok) {
      setProjects(prev => prev.map(p => 
        p.id === id 
          ? { ...p, status: 'concluido', endDate: now } 
          : p
      ));
      await registerActivity('project', 'update', `Projeto marcado como concluído`);
    } else {
      alert('Erro ao concluir projeto');
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este evento?')) return;

    const response = await fetch(`/api/events/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      setEvents(prev => prev.filter(e => e.id !== id));
      await registerActivity('event', 'delete', `Evento removido`);
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: ChartBarIcon, section: 'dashboard' },
    { name: 'Equipe', icon: UsersIcon, section: 'team' },
    { name: 'Projetos', icon: DocumentTextIcon, section: 'projects' },
    { name: 'Eventos', icon: CalendarIcon, section: 'events' },
  ] as const;

  const renderContent = () => {
    switch (currentSection) {
      case 'team':
        return (
          <TeamSection 
            members={members} 
            onDelete={handleDeleteMember}
            onToggleStatus={handleToggleMemberStatus}
          />
        );
      case 'projects':
        return (
          <ProjectsSection 
            projects={projects}
            onDelete={handleDeleteProject}
            onComplete={handleCompleteProject}
          />
        );
      case 'events':
        return (
          <EventsSection 
            events={events}
            onDelete={handleDeleteEvent}
          />
        );
      default:
        return (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                      <div className="flex items-baseline">
                        <p className="text-2xl font-semibold text-gray-900">
                          <CountUp
                            end={Number(stat.value)}
                            duration={2}
                            decimals={stat.name === 'Taxa de Crescimento' ? 1 : 0}
                            suffix={stat.name === 'Taxa de Crescimento' ? '%' : ''}
                          />
                        </p>
                        <p className={`ml-2 text-sm font-medium ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Atividades Recentes</h2>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                      <div className="w-2 h-2 rounded-full bg-primary mr-4" />
                      <div>
                        <p className="text-sm text-gray-900">{activity.details}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {activities.length === 0 && (
                    <p className="text-sm text-gray-500">Nenhuma atividade recente</p>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setIsProjectModalOpen(true)}
                    className="p-4 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-colors"
                  >
                    <DocumentTextIcon className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">Novo Projeto</span>
                  </button>
                  <button 
                    onClick={() => setIsMemberModalOpen(true)}
                    className="p-4 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-colors"
                  >
                    <UsersIcon className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">Adicionar Membro</span>
                  </button>
                  <button 
                    onClick={() => setIsEventModalOpen(true)}
                    className="p-4 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-colors"
                  >
                    <CalendarIcon className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">Novo Evento</span>
                  </button>
                  <button 
                    onClick={() => setIsReportModalOpen(true)}
                    className="p-4 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-colors"
                  >
                    <DocumentIcon className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">Relatórios</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  const stats = [
    {
      name: 'Visualizações Totais',
      value: totalViews,
      icon: EyeIcon,
      change: 'Tempo real',
      changeType: 'positive'
    },
    {
      name: 'Membros Ativos',
      value: activeMembers.length,
      icon: UserGroupIcon,
      change: `Total: ${members.length}`,
      changeType: 'positive'
    },
    {
      name: 'Projetos em Andamento',
      value: activeProjects.length,
      icon: DocumentIcon,
      change: `Total: ${projects.length}`,
      changeType: 'positive'
    },
    {
      name: 'Taxa de Crescimento',
      value: 24.3,
      icon: ArrowTrendingUpIcon,
      change: '+4.1%',
      changeType: 'positive'
    }
  ];

  const recentActivities = [
    { text: 'Novo membro adicionado à equipe', time: 'Há 2 horas' },
    { text: 'Atualização no site principal', time: 'Há 3 horas' },
    { text: 'Novo projeto cadastrado', time: 'Há 5 horas' },
    { text: 'Reunião agendada', time: 'Há 1 dia' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Mobile */}
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)} />
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="p-6">
          <div className="mb-8">
            <Image
              src="/images/logos/logo-principal.png"
              alt="Logo EJT"
              width={150}
              height={50}
              className="h-auto"
            />
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.section}
                onClick={() => setCurrentSection(item.section)}
                className={`
                  w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                  ${currentSection === item.section
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-primary/10 hover:text-primary'}
                `}
              >
                <item.icon className="mr-3 h-6 w-6" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 md:px-8">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-600 md:hidden"
            >
              {sidebarOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
            <div className="flex-1 md:text-center md:flex-none">
              <h1 className="text-xl font-bold text-gray-800">
                {menuItems.find(item => item.section === currentSection)?.name || 'Painel Administrativo'}
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Sair
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-8">
          {renderContent()}
        </main>
      </div>

      {/* Modals */}
      <NewProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSubmit={handleNewProject}
      />
      <NewMemberModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        onSubmit={handleNewMember}
      />
      <NewEventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSubmit={handleNewEvent}
      />
      <GenerateReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleGenerateReport}
      />
    </div>
  );
} 