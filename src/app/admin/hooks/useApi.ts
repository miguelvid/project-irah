import { useState } from 'react';

import { useNotification } from './useNotification';

export const useApiData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const fetchData = async <T,>(url: string): Promise<T | null> => {
    try {
      setIsLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      showNotification('error', error instanceof Error ? error.message : 'Erro ao carregar dados');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const mutateData = async <T,>(url: string, method: 'POST' | 'PUT' | 'DELETE', data?: unknown): Promise<T | null> => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error mutating data:', error);
      showNotification('error', error instanceof Error ? error.message : 'Erro ao processar requisição');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchData, mutateData };
};