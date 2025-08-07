import { useEffect, useState } from 'react';

export function usePageViews(page: string) {
  const [views, setViews] = useState<number>(0);
  const [hasRegistered, setHasRegistered] = useState(false);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        // Registra a visualização apenas uma vez por montagem do componente
        if (!hasRegistered) {
          await fetch('/api/views', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page })
          });
          setHasRegistered(true);
        }

        // Busca o total de visualizações
        const response = await fetch('/api/views');
        const data = await response.json();
        setViews(data.total || 0);
      } catch (error) {
        console.error('Erro ao registrar/buscar visualizações:', error);
      }
    };

    fetchViews();

    // Atualiza as visualizações a cada 30 segundos
    const interval = setInterval(fetchViews, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [page, hasRegistered]);

  return views;
} 