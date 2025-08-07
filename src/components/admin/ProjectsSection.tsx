import { Project } from '@/types/admin';
import { TrashIcon, CheckIcon } from '@heroicons/react/24/outline';

interface ProjectsSectionProps {
  projects: Project[];
  onDelete?: (id: number) => void;
  onComplete?: (id: number) => void;
}

export default function ProjectsSection({ projects, onDelete, onComplete }: ProjectsSectionProps) {
  const activeProjects = projects.filter(p => p.status === 'em_andamento');

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'em_andamento':
        return 'bg-blue-100 text-blue-800';
      case 'concluido':
        return 'bg-green-100 text-green-800';
      case 'pausado':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'em_andamento':
        return 'Em Andamento';
      case 'concluido':
        return 'Concluído';
      case 'pausado':
        return 'Pausado';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Projetos</h2>
        <span className="text-sm text-gray-500">
          {activeProjects.length} em andamento de {projects.length} projetos
        </span>
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{project.title}</h3>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
                {project.status === 'em_andamento' && (
                  <button
                    onClick={() => onComplete?.(project.id)}
                    className="p-1.5 text-green-500 hover:bg-green-50 rounded-full transition-colors"
                    title="Marcar como concluído"
                  >
                    <CheckIcon className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => onDelete?.(project.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Excluir projeto"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">{project.description}</p>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Início: {new Date(project.startDate).toLocaleDateString()}</span>
              {project.endDate && (
                <span>Término: {new Date(project.endDate).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-center text-gray-500 py-4">Nenhum projeto cadastrado</p>
        )}
      </div>
    </div>
  );
} 