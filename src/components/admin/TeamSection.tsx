import { TeamMember } from '@/types/admin';
import { TrashIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface TeamSectionProps {
  members: TeamMember[];
  onDelete?: (id: number) => void;
  onToggleStatus?: (id: number, active: boolean) => void;
}

export default function TeamSection({ members, onDelete, onToggleStatus }: TeamSectionProps) {
  const activeMembers = members.filter(m => m.active);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Membros da Equipe</h2>
        <span className="text-sm text-gray-500">
          {activeMembers.length} ativos de {members.length} membros
        </span>
      </div>
      <div className="space-y-4">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${member.active ? 'bg-green-500' : 'bg-gray-300'} mr-4`} />
              <div>
                <h3 className="font-medium text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                member.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {member.active ? 'Ativo' : 'Inativo'}
              </span>
              <button
                onClick={() => onToggleStatus?.(member.id, !member.active)}
                className={`p-1.5 rounded-full transition-colors ${
                  member.active 
                    ? 'text-red-500 hover:bg-red-50' 
                    : 'text-green-500 hover:bg-green-50'
                }`}
                title={member.active ? 'Desativar membro' : 'Ativar membro'}
              >
                {member.active ? (
                  <XCircleIcon className="w-5 h-5" />
                ) : (
                  <CheckCircleIcon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => onDelete?.(member.id)}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Excluir membro"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {members.length === 0 && (
          <p className="text-center text-gray-500 py-4">Nenhum membro cadastrado</p>
        )}
      </div>
    </div>
  );
} 