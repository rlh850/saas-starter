const chat = new Map<string, string>();

export const chatRepository = {
  setLastResponseId(chatId: string, responseId: string) {
    return chat.set(chatId, responseId);
  },

  getLastResponseId(chatId: string) {
    return chat.get(chatId);
  },
};
