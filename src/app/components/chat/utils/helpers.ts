import { z } from 'zod';
import { Message, ApiResponse } from './types';

// Zod schema for message validation
export const messageSchema = z.object({
  text: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(1000, 'Message too long (max 1000 characters)')
    .trim()
    .refine(val => val.length > 0, 'Message cannot be empty after trimming'),
});

// Zod schema for chat input validation
export const chatInputSchema = z.object({
  message: messageSchema.shape.text,
  id: z.string().uuid().optional(),
});

export const createMessage = (text: string, sender: 'user' | 'bot', id?: string): Message => ({
  text,
  sender,
  id: id || crypto.randomUUID(),
  timestamp: new Date(),
});

export const createErrorMessage = (error: string): Message => createMessage(error, 'bot');

export const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Updated validation function using Zod
export const validateMessage = (text: string): { isValid: boolean; error?: string } => {
  try {
    messageSchema.parse({ text });
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: error.errors[0]?.message || 'Invalid message',
      };
    }
    return { isValid: false, error: 'Validation error' };
  }
};

// Helper function for simple boolean validation (backward compatibility)
export const isValidMessage = (text: string): boolean => {
  return validateMessage(text).isValid;
};
