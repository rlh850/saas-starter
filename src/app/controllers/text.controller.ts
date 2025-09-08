import z from 'zod';
import { textService } from '../services/text.service';

const sendMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(1000, 'Message too long'),
  id: z.string().uuid(),
});

export interface TextRequestBody {
  id?: string;
  message: string;
}

export const textController = {
  async sendMessage(body: TextRequestBody) {
    try {
      const validatedData = sendMessageSchema.safeParse(body);

      if (!validatedData.success) {
        return {
          error: 'Validation failed',
          details: validatedData.error.errors.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        };
      }

      const response = await textService.sendMessage(
        validatedData.data.message,
        validatedData.data.id
      );
      return response;
    } catch (error) {
      console.error('Text generation error:', error);
      return { error: 'Failed to generate a response.' };
    }
  },
};
