export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  portfolio: string;
  github: string;
  linkedin: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  technologies: string[];
}

export interface ProfileData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
}

export interface LearnerProfileProps {
  initialData?: {
    personalInfo?: PersonalInfo;
    education?: Education[];
    experience?: Experience[];
    skills?: string[];
  };
  onSave: (profileData: ProfileData) => void;
}
