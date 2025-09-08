import { useState, useCallback } from 'react';
import { isValidMessage } from '../utils/helpers';

export const useChatInput = () => {
  const [inputText, setInputText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = useCallback((text: string) => {
    setInputText(text);
  }, []);

  const handleSubmit = useCallback(
    (onSubmit: (text: string) => void) => {
      if (isValidMessage(inputText)) {
        onSubmit(inputText);
        setInputText('');
      }
    },
    [inputText]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, onSubmit: (text: string) => void) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(onSubmit);
      }
    },
    [handleSubmit]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return {
    inputText,
    isHovered,
    handleInputChange,
    handleSubmit,
    handleKeyDown,
    handleMouseEnter,
    handleMouseLeave,
    canSubmit: isValidMessage(inputText),
  };
};
