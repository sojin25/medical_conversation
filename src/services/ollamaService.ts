import { Message } from '../types';

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

export class OllamaService {
  private static instance: OllamaService;
  private controller: AbortController | null = null;

  private constructor() {}

  static getInstance(): OllamaService {
    if (!OllamaService.instance) {
      OllamaService.instance = new OllamaService();
    }
    return OllamaService.instance;
  }

  async generateResponse(prompt: string): Promise<string> {
    this.controller = new AbortController();
    
    try {
      const response = await fetch(OLLAMA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gemma:2b',
          prompt,
          stream: false,
        }),
        signal: this.controller.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error generating response: ${error.message}`);
      }
      throw error;
    }
  }

  cancelRequest() {
    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }
  }
}