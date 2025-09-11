import React from 'react';
import ChatWindow from './components/chat/ChatWindow';
import { chatTheme } from './components/chat/theme';
import Lookup from './data/Lookup';

const page = () => {
  return (
    <div>
      {Lookup.HERO_HEADING}
    </div>
  );
};

export default page;
