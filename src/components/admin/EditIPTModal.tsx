"use client";

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface IPTData {
  maiorPreco: number;
  menorPreco: number;
  diferenca: number;
  precoMedio: number;
  anterior: number;
  atual: number;
  inflacao: number;
}

interface EditIPTModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IPTData) => void;
  initialData: IPTData;
}

export default function EditIPTModal({ isOpen, onClose, onSubmit, initialData }: EditIPTModalProps) {
  // Estado para os valores que o usuário vê/edita
  const [formData, setFormData] = useState({
    maiorPreco: initialData.maiorPreco.toString(),
    menorPreco: initialData.menorPreco.toString(),
    diferenca: initialData.diferenca.toString(),
    precoMedio: initialData.precoMedio.toString(),
    anterior: initialData.anterior.toString(),
    atual: initialData.atual.toString(),
    inflacao: initialData.inflacao.toString()
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Converte os valores para números
      const data: IPTData = {
        maiorPreco: parseFloat(formData.maiorPreco.replace(',', '.')),
        menorPreco: parseFloat(formData.menorPreco.replace(',', '.')),
        diferenca: parseFloat(formData.diferenca.replace(',', '.')),
        precoMedio: parseFloat(formData.precoMedio.replace(',', '.')),
        anterior: parseFloat(formData.anterior.replace(',', '.')),
        atual: parseFloat(formData.atual.replace(',', '.')),
        inflacao: parseFloat(formData.inflacao.replace(',', '.'))
      };

      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Error updating IPT data:', error);
      alert('Erro ao atualizar dados do IPT');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    // Remove tudo que não for número, vírgula ou ponto
    const cleanValue = value.replace(/[^\d,.]/g, '');
    
    // Garante que só tem uma vírgula ou ponto
    const parts = cleanValue.split(/[,.]/);
    if (parts.length > 2) {
      return; // Ignora se tentar adicionar mais de um separador decimal
    }

    // Atualiza o valor
    setFormData(prev => ({
      ...prev,
      [field]: cleanValue
    }));
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-xl shadow-lg">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Dialog.Title className="text-2xl font-bold text-gray-900">
              Editar Dados do IPT
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maior Preço (R$)
                </label>
                <input
                  type="text"
                  value={formData.maiorPreco}
                  onChange={(e) => handleInputChange('maiorPreco', e.target.value)}
                  placeholder="0,00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Menor Preço (R$)
                </label>
                <input
                  type="text"
                  value={formData.menorPreco}
                  onChange={(e) => handleInputChange('menorPreco', e.target.value)}
                  placeholder="0,00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diferença (%)
                </label>
                <input
                  type="text"
                  value={formData.diferenca}
                  onChange={(e) => handleInputChange('diferenca', e.target.value)}
                  placeholder="0,00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço Médio (R$)
                </label>
                <input
                  type="text"
                  value={formData.precoMedio}
                  onChange={(e) => handleInputChange('precoMedio', e.target.value)}
                  placeholder="0,00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Anterior (R$)
                </label>
                <input
                  type="text"
                  value={formData.anterior}
                  onChange={(e) => handleInputChange('anterior', e.target.value)}
                  placeholder="0,00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Atual (R$)
                </label>
                <input
                  type="text"
                  value={formData.atual}
                  onChange={(e) => handleInputChange('atual', e.target.value)}
                  placeholder="0,00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Inflação (%)
                </label>
                <input
                  type="text"
                  value={formData.inflacao}
                  onChange={(e) => handleInputChange('inflacao', e.target.value)}
                  placeholder="0,00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 