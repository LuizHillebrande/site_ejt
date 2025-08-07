import { useState, useEffect, useRef } from 'react';

export function usePageViews(page: string = 'all') {
  const [views, setViews] = useState(0);
  const [hasRegistered, setHasRegistered] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Função para buscar views
  const fetchViews = async () => {
    try {
      // Cancela requisição anterior se existir
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Cria novo controller para esta requisição
      abortControllerRef.current = new AbortController();

      const response = await fetch(`/api/views?page=${page}`, {
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) return;

      const data = await response.json();
      if (typeof data.views === 'number') {
        setViews(data.views);
      }
    } catch (error) {
      // Ignora erros de abort
      if ((error as any)?.name === 'AbortError') return;
      console.error('Error fetching views:', error);
    }
  };

  // Função para registrar view
  const registerView = async () => {
    if (hasRegistered) return;

    try {
      const response = await fetch('/api/views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page })
      });

      if (!response.ok) return;
      setHasRegistered(true);

      // Atualiza a contagem após registrar
      fetchViews();
    } catch (error) {
      console.error('Error registering view:', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!mounted) return;
      await fetchViews();
      await registerView();
    };

    init();

    // Atualiza a cada 30 segundos
    const startPolling = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (mounted) {
          fetchViews();
          startPolling();
        }
      }, 30000);
    };

    startPolling();

    return () => {
      mounted = false;
      
      // Limpa timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Cancela requisição pendente
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page]);

  return views;
} 