import { useState } from 'react';
import { OllamaService } from '../services/ollamaService';

export const useOllama = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const ollamaService = OllamaService.getInstance();

  const generateResponse = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await ollamaService.generateResponse(prompt);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '不明なエラーが発生しました';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelRequest = () => {
    ollamaService.cancelRequest();
    setIsLoading(false);
  };

  return {
    generateResponse,
    cancelRequest,
    isLoading,
    error,
  };
};