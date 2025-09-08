'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useChatInput } from './hooks/useChatInput';
import { chatTheme } from './theme';

interface ChatInputAreaProps {
  onSendMessage: (message: string) => void;
}

const ChatInputArea = ({ onSendMessage }: ChatInputAreaProps) => {
  const {
    inputText,
    isHovered,
    handleInputChange,
    handleSubmit,
    handleKeyDown,
    handleMouseEnter,
    handleMouseLeave,
    canSubmit,
  } = useChatInput();

  return (
    <div className={chatTheme.spacing.input}>
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            value={inputText}
            onChange={e => handleInputChange(e.target.value)}
            placeholder="Type a message..."
            className={`w-full min-h-[40px] max-h-24 px-3 py-2 pr-10 resize-none ${chatTheme.radius.input} ${chatTheme.border.primary} ${chatTheme.input.background} ${chatTheme.input.text} ${chatTheme.input.placeholder} focus:outline-none focus:ring-2 ${chatTheme.input.focus.ring} ${chatTheme.input.focus.border} ${chatTheme.transition.default}`}
            rows={1}
            onKeyDown={e => handleKeyDown(e, onSendMessage)}
            style={{
              height: 'auto',
              minHeight: '40px',
            }}
            onInput={e => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 96) + 'px';
            }}
          />
        </div>

        <Button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={!canSubmit}
          onClick={() => handleSubmit(onSendMessage)}
          className={`h-10 w-10 mb-1 ${chatTheme.radius.button} ${chatTheme.button.send.background} ${chatTheme.button.send.hover} ${chatTheme.button.send.text} ${chatTheme.transition.default} disabled:opacity-50 disabled:cursor-not-allowed`}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInputArea;
