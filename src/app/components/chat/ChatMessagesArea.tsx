import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Message } from './utils/types';
import { useAutoScroll } from './hooks/useAutoScroll';
import LoadingIndicator from './LoadingIndicator';
import { chatTheme } from './theme';

interface ChatMessagesAreaProps {
  messages: Message[];
  isLoading?: boolean;
}

const ChatMessagesArea = ({ messages, isLoading }: ChatMessagesAreaProps) => {
  const lastMessageRef = useAutoScroll(messages);

  return (
    <ScrollArea className="h-full">
      <div className={`${chatTheme.spacing.container} space-y-4`}>
        {messages.map((message, index) => (
          <div
            key={message.id || index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={`flex ${chatTheme.spacing.gap} ${
              message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <Avatar className="h-7 w-7 shrink-0">
              <AvatarFallback
                className={`text-xs font-medium ${
                  message.sender === 'user'
                    ? `${chatTheme.user.avatar} ${chatTheme.user.avatarText}`
                    : `${chatTheme.ai.avatar} ${chatTheme.ai.avatarText}`
                }`}
              >
                {message.sender === 'user' ? 'U' : 'AI'}
              </AvatarFallback>
            </Avatar>

            <div
              className={`flex flex-col gap-1 max-w-[80%] ${
                message.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`${chatTheme.radius.message} ${chatTheme.spacing.message} ${
                  message.sender === 'user'
                    ? `${chatTheme.user.background} ${chatTheme.user.text}`
                    : `${chatTheme.ai.background} ${chatTheme.ai.text}`
                }`}
              >
                <div
                  className={`prose prose-sm max-w-none prose-headings:${chatTheme.user.text} prose-p:${chatTheme.ai.text} prose-strong:${chatTheme.user.text} prose-code:${chatTheme.code.text} prose-code:${chatTheme.code.background} prose-code:px-1 prose-code:${chatTheme.radius.message}`}
                >
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              </div>

              {message.timestamp && (
                <div className={`text-xs ${chatTheme.text.secondary} px-1`}>
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className={`flex ${chatTheme.spacing.gap}`}>
            <Avatar className="h-7 w-7 shrink-0">
              <AvatarFallback
                className={`${chatTheme.ai.avatar} ${chatTheme.ai.avatarText} text-xs font-medium`}
              >
                AI
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div
                className={`${chatTheme.ai.background} ${chatTheme.radius.message} ${chatTheme.spacing.message}`}
              >
                <LoadingIndicator />
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default ChatMessagesArea;
