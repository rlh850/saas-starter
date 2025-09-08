import z from 'zod';
import { functionCallService } from '../services/function-call.service';

const generateFunctionCallSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(1000, 'Message too long'),
  id: z.string(),
});

export interface FunctionCallRequestBody {
  id?: string;
  message: string;
}

export const functionCallController = {
  async generateFunctionCall(body: FunctionCallRequestBody) {
    try {
      const validatedData = generateFunctionCallSchema.safeParse(body);

      if (!validatedData.success) {
        return {
          error: 'Validation failed',
          details: validatedData.error.errors.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        };
      }

      const response = await functionCallService.generateFunctionCall(
        validatedData.data.message,
        validatedData.data.id
      );
      return response;
    } catch (error) {
      console.error('Function call generation error:', error);
      return { error: 'Failed to generate function call.' };
    }
  },
};
