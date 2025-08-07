import { Event } from '@/types/admin';
import { TrashIcon } from '@heroicons/react/24/outline';

interface EventsSectionProps {
  events: Event[];
  onDelete?: (id: number) => void;
}

export default function EventsSection({ events, onDelete }: EventsSectionProps) {
  // Ordena eventos por data
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Separa eventos futuros e passados
  const now = new Date();
  const upcomingEvents = sortedEvents.filter(e => new Date(e.date) >= now);
  const pastEvents = sortedEvents.filter(e => new Date(e.date) < now);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Eventos</h2>
        <span className="text-sm text-gray-500">
          {upcomingEvents.length} eventos programados
        </span>
      </div>

      {/* Próximos Eventos */}
      {upcomingEvents.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Próximos Eventos</h3>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-primary">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{event.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => onDelete?.(event.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Excluir evento"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Eventos Passados */}
      {pastEvents.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Eventos Anteriores</h3>
          <div className="space-y-4">
            {pastEvents.map((event) => (
              <div key={event.id} className="p-4 bg-gray-50 rounded-lg opacity-75">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{event.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => onDelete?.(event.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Excluir evento"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {events.length === 0 && (
        <p className="text-center text-gray-500 py-4">Nenhum evento cadastrado</p>
      )}
    </div>
  );
} 