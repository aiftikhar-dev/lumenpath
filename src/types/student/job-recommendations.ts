export interface CareerPath {
  id: number;
  title: string;
  category: string;
  experience: string;
  matchPercentage: number;
  growth: string;
  region: string;
  requiredSkills: string[];
  yourSkills: string[];
  missingSkills: string[];
  description: string;
  careerProgression: string[];
  industries: string[];
  skillImportance: Record<string, number>;
}

export interface LearningResource {
  platform: string;
  course: string;
  provider: string;
  duration: string;
}

export interface LearningResources {
  [skill: string]: LearningResource[];
}

export interface SortOption {
  value: string;
  label: string;
}
