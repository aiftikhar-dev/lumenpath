export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface CareerPath {
  title: string;
  match: string;
  growth: string;
  salary: string;
}

export interface Skill {
  name: string;
  level: number;
  demand: string;
}

export interface AICareerCounselorProps {
  messages: Message[];
  isInitializing: boolean;
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Message) => void;
  sendMessage: (message: string) => Promise<void>;
  clearError: () => void;
}
