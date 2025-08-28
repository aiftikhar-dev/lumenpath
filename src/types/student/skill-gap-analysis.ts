export interface LearnerProfile {
  skills?: string[];
  experience?: string[];
  goal?: string;
}

export interface InDemandSkill {
  skill: string;
  demand: number;
  learnerLevel: number;
  gap: number;
  salaryImpact: string;
  jobCount: number;
  difficulty: string;
  timeToMaster: string;
  courses: string[];
}

export interface MarketDemand {
  domain: string;
  growth: string;
  color: string;
  marketValue: string;
  jobOpenings: string;
  avgSalary: string;
  topCompanies: string[];
  inDemandSkills: InDemandSkill[];
}

export interface RadarData {
  skill: string;
  "Market Demand": number;
  "Your Level": number;
}

export interface BarData {
  skill: string;
  gap: number;
  level: number;
  demand: number;
}

export interface PieData {
  name: string;
  value: number;
  color: string;
}

export interface SkillGapAnalysisProps {
  learnerProfile?: LearnerProfile;
}
