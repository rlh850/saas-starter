import { useState, useRef, useCallback } from 'react';
import { Message } from '../utils/types';
import { ChatApiService } from '../utils/api';
import { createMessage, createErrorMessage, isValidMessage } from '../utils/helpers';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([createMessage('Welcome!', 'bot')]);
  const [isLoading, setIsLoading] = useState(false);
  const chatId = useRef(crypto.randomUUID());

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!isValidMessage(text)) {
        return;
      }

      const userMessage = createMessage(text, 'user');
      addMessage(userMessage);
      setIsLoading(true);

      try {
        const response = await ChatApiService.sendTextMessage(text, chatId.current);

        if (response.error) {
          addMessage(createErrorMessage(response.error));
        } else {
          const botMessage = createMessage(
            response.data?.text || 'Sorry, I encountered an error.',
            'bot'
          );
          addMessage(botMessage);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        addMessage(createErrorMessage('Sorry, I encountered an error sending your message.'));
      } finally {
        setIsLoading(false);
      }
    },
    [addMessage]
  );

  const clearMessages = useCallback(() => {
    setMessages([createMessage('Welcome!', 'bot')]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    chatId: chatId.current,
  };
};
