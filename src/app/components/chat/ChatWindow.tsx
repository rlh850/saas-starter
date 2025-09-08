'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ChatMessagesArea from './ChatMessagesArea';
import ChatInputArea from './ChatInputArea';
import { useChat } from './hooks/useChat';
import { chatTheme } from './theme';

const ChatWindow = () => {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="flex h-[600px] w-full max-w-4xl mx-auto">
      <Card
        className={`flex flex-col w-full ${chatTheme.shadow.container} ${chatTheme.border.primary} ${chatTheme.background.card}`}
      >
        <CardContent className="flex flex-col h-full p-0">
          <div className="flex-1 overflow-hidden">
            <ChatMessagesArea messages={messages} isLoading={isLoading} />
          </div>
          <div
            className={`border-t ${chatTheme.border.primary} ${chatTheme.background.secondary} backdrop-blur-sm`}
          >
            <ChatInputArea onSendMessage={sendMessage} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatWindow;
