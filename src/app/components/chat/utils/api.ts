import { ApiResponse } from './types';

export class ChatApiService {
  private static baseUrl = '/api/generate';

  static async sendTextMessage(message: string, chatId: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          id: chatId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Failed to send message' };
      }

      return { data };
    } catch (error) {
      console.error('Text message API error:', error);
      return { error: 'Network error occurred' };
    }
  }

  static async sendFunctionCall(message: string, chatId: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/function-call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          id: chatId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Failed to execute function call' };
      }

      return { data };
    } catch (error) {
      console.error('Function call API error:', error);
      return { error: 'Network error occurred' };
    }
  }

  static async generateImage(prompt: string, chatId?: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          id: chatId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Failed to generate image' };
      }

      return { data };
    } catch (error) {
      console.error('Image generation API error:', error);
      return { error: 'Network error occurred' };
    }
  }
}
