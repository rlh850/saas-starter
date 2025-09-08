import React from 'react';
import ChatWindow from './components/chat/ChatWindow';
import { chatTheme } from './components/chat/theme';

const page = () => {
  return (
    <div
      className={`min-h-screen ${chatTheme.background.primary} flex items-center justify-center p-4`}
    >
      <ChatWindow />
    </div>
  );
};

export default page;
