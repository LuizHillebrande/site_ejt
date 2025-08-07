import { useState } from 'react';
import Modal from '../Modal';

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { type: string; period: string }) => void;
}

export default function GenerateReportModal({ isOpen, onClose, onSubmit }: GenerateReportModalProps) {
  const [type, setType] = useState('');
  const [period, setPeriod] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ type, period });
    setType('');
    setPeriod('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gerar Relatório">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Tipo de Relatório
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          >
            <option value="">Selecione um tipo</option>
            <option value="financial">Financeiro</option>
            <option value="projects">Projetos</option>
            <option value="team">Equipe</option>
            <option value="events">Eventos</option>
          </select>
        </div>
        <div>
          <label htmlFor="period" className="block text-sm font-medium text-gray-700">
            Período
          </label>
          <select
            id="period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          >
            <option value="">Selecione um período</option>
            <option value="last_week">Última Semana</option>
            <option value="last_month">Último Mês</option>
            <option value="last_quarter">Último Trimestre</option>
            <option value="last_year">Último Ano</option>
            <option value="all">Todo o Período</option>
          </select>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md"
          >
            Gerar Relatório
          </button>
        </div>
      </form>
    </Modal>
  );
} 