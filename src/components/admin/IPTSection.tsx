"use client";

import { useState, useEffect } from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import EditIPTModal from './EditIPTModal';

interface IPTData {
  maiorPreco: number;
  menorPreco: number;
  diferenca: number;
  precoMedio: number;
  anterior: number;
  atual: number;
  inflacao: number;
}

export default function IPTSection() {
  const [iptData, setIptData] = useState<IPTData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchIPTData();
  }, []);

  const fetchIPTData = async () => {
    try {
      const response = await fetch('/api/ipt');
      if (!response.ok) throw new Error('Failed to fetch IPT data');
      const data = await response.json();
      setIptData(data);
    } catch (error) {
      console.error('Error fetching IPT data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateIPT = async (data: IPTData) => {
    try {
      const response = await fetch('/api/ipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update IPT data');
      await fetchIPTData();
    } catch (error) {
      console.error('Error updating IPT data:', error);
      throw error;
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Dados do IPT</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Atualizar Dados
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {iptData && (
          <>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <ChartBarIcon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-600">Maior Preço</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(iptData.maiorPreco)}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <ChartBarIcon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-600">Menor Preço</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(iptData.menorPreco)}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <ChartBarIcon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-600">Diferença</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {formatPercentage(iptData.diferenca)}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <ChartBarIcon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-600">Preço Médio</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(iptData.precoMedio)}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <ChartBarIcon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-600">Anterior</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(iptData.anterior)}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <ChartBarIcon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-600">Atual</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(iptData.atual)}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <ChartBarIcon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-600">Inflação</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {formatPercentage(iptData.inflacao)}
              </span>
            </div>
          </>
        )}
      </div>

      {iptData && (
        <EditIPTModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUpdateIPT}
          initialData={iptData}
        />
      )}
    </div>
  );
} 