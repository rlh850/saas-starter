import { useRef, useEffect } from 'react';

export const useAutoScroll = (messages: any[]) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return lastMessageRef;
};
