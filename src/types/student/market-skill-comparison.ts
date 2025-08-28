export interface Role {
  value: string;
  label: string;
}

export interface Region {
  value: string;
  label: string;
}

export interface UserSkill {
  skill: string;
  userLevel: number;
  marketAvg: number;
  demand: string;
  trend: string;
  salaryImpact: string;
  jobOpenings: number;
  companies: string[];
  difficulty: string;
}

export interface MarketData {
  category: string;
  user: number;
  market: number;
  industry: number;
}

export interface SalaryBenchmark {
  userEstimate: number;
  marketAverage: number;
  top10Percent: number;
  region: string;
  currency: string;
}

export interface JobMarketTrend {
  month: string;
  openings: number;
  applications: number;
}

export interface SkillRecommendation {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  priority: string;
  timeToAcquire: string;
  courses: string[];
}

export interface MarketSkillComparisonProps {
  selectedRole: string;
  selectedRegion: string;
  onRoleChange: (role: string) => void;
  onRegionChange: (region: string) => void;
}
