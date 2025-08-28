export interface InterviewType {
    id: string;
    title: string;
    description: string;
    duration: string;
    difficulty: string;
    topics: string[];
    companies: string[];
  }
  
  export interface PastInterview {
    id: number;
    type: string;
    company: string;
    date: string;
    score: number;
    feedback: string;
    duration: string;
  }
  
  export interface SkillMetric {
    skill: string;
    score: number;
    improvement: string;
  }
  
  export interface InterviewStats {
    interviewsCompleted: number;
    averageScore: string;
    practiceTime: string;
    bestScore: string;
  }
  
  export interface MockQuestions {
    technical: string[];
    behavioral: string[];
    "case-study": string[];
  }
  