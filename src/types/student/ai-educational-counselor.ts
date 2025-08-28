export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface RecommendedCourse {
  title: string;
  duration: string;
  difficulty: string;
  rating: number;
  students: string;
  relevance: string;
}

export interface StudyPathPhase {
  phase: string;
  courses: number;
  duration: string;
  status: 'current' | 'upcoming';
}

export interface LearningPreference {
  type: string;
  compatibility: string;
  icon: string;
}

export interface AIEducationalCounselorProps {
  messages: Message[];
  isInitializing: boolean;
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Message) => void;
  sendMessage: (message: string) => Promise<void>;
  clearError: () => void;
}
