export interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    portfolio: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    technologies: string[];
  }>;
  skills: string[];
  achievements: string[];
  languages: Array<{ name: string; level: string }>;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface AIResponse {
  content: string;
  updates: Partial<ResumeData> | null;
}

export interface ResumeBuilderProps {
  initialData?: ResumeData;
  onSave?: (resumeData: ResumeData) => void;
}
