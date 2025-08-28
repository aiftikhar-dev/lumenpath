export interface AssessmentType {
  id: string;
  title: string;
  description: string;
  icon: any; // Lucide icon component
  duration: string;
  questions: number;
  difficulty: string;
  category: string;
  color: string;
}

export interface AssessmentQuestion {
  question: string;
  options: string[];
  correct?: number;
  type: 'multiple' | 'reading' | 'personality';
}

export interface AssessmentResult {
  score?: number;
  level?: string;
  type?: string;
  strengths?: string[];
  improvements?: string[];
  traits?: string[];
  workStyle?: string;
  recommendations: string[];
}

export interface AssessmentSession {
  selectedAssessment: AssessmentType | null;
  currentQuestion: number;
  answers: Record<number, number>;
  showResults: boolean;
  timeLeft: number;
}
