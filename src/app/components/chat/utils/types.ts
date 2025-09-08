export interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp?: Date;
  id?: string;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}
