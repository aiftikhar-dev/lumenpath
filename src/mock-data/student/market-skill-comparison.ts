import { Role, Region, UserSkill, MarketData, SalaryBenchmark, JobMarketTrend, SkillRecommendation } from "@/types/student/market-skill-comparison";

export const roles: Role[] = [
  { value: "data-scientist", label: "Data Scientist" },
  { value: "ai-engineer", label: "AI/ML Engineer" },
  { value: "devops-engineer", label: "DevOps Engineer" },
  { value: "cloud-architect", label: "Cloud Architect" },
  { value: "cybersecurity", label: "Cybersecurity Specialist" }
];

export const regions: Region[] = [
  { value: "dubai", label: "Dubai" },
  { value: "abudhabi", label: "Abu Dhabi" },
  { value: "sharjah", label: "Sharjah" },
  { value: "ajman", label: "Ajman" },
  { value: "ras-al-khaimah", label: "Ras Al Khaimah" },
  { value: "fujairah", label: "Fujairah" },
  { value: "umm-al-quwain", label: "Umm Al Quwain" }
];

export const userSkills: UserSkill[] = [
  { 
    skill: "Python", 
    userLevel: 75, 
    marketAvg: 85, 
    demand: "High", 
    trend: "+15%", 
    salaryImpact: "+32%",
    jobOpenings: 1850,
    companies: ["Careem", "Noon", "Emirates NBD"],
    difficulty: "Medium"
  },
  { 
    skill: "Machine Learning", 
    userLevel: 60, 
    marketAvg: 80, 
    demand: "Critical", 
    trend: "+25%", 
    salaryImpact: "+48%",
    jobOpenings: 2100,
    companies: ["ADNOC", "Mashreq", "Etisalat"],
    difficulty: "High"
  },
  { 
    skill: "Data Visualization", 
    userLevel: 70, 
    marketAvg: 75, 
    demand: "High", 
    trend: "+12%", 
    salaryImpact: "+18%",
    jobOpenings: 1650,
    companies: ["Dubai Electricity", "FAB", "Emaar"],
    difficulty: "Medium"
  },
  { 
    skill: "SQL", 
    userLevel: 80, 
    marketAvg: 85, 
    demand: "Essential", 
    trend: "+8%", 
    salaryImpact: "+22%",
    jobOpenings: 3100,
    companies: ["All Major Banks", "Government", "Telecom"],
    difficulty: "Low"
  },
  { 
    skill: "Deep Learning", 
    userLevel: 45, 
    marketAvg: 70, 
    demand: "Growing", 
    trend: "+30%", 
    salaryImpact: "+52%",
    jobOpenings: 980,
    companies: ["Google", "Microsoft", "Careem AI"],
    difficulty: "Very High"
  },
  { 
    skill: "Cloud Platforms", 
    userLevel: 55, 
    marketAvg: 75, 
    demand: "Critical", 
    trend: "+20%", 
    salaryImpact: "+42%",
    jobOpenings: 2850,
    companies: ["AWS", "Microsoft Azure", "Google Cloud"],
    difficulty: "High"
  }
];

export const marketData: MarketData[] = [
  { category: "Technical Skills", user: 68, market: 78, industry: 82 },
  { category: "Leadership", user: 60, market: 65, industry: 75 },
  { category: "Communication", user: 75, market: 70, industry: 80 },
  { category: "Problem Solving", user: 80, market: 75, industry: 85 },
  { category: "Innovation", user: 65, market: 72, industry: 78 },
  { category: "Collaboration", user: 70, market: 68, industry: 75 }
];

export const salaryBenchmark: SalaryBenchmark = {
  userEstimate: 95000,
  marketAverage: 120000,
  top10Percent: 180000,
  region: "UAE",
  currency: "AED"
};

export const jobMarketTrends: JobMarketTrend[] = [
  { month: "Jan", openings: 245, applications: 1250 },
  { month: "Feb", openings: 280, applications: 1400 },
  { month: "Mar", openings: 320, applications: 1580 },
  { month: "Apr", openings: 380, applications: 1720 },
  { month: "May", openings: 420, applications: 1850 },
  { month: "Jun", openings: 465, applications: 1920 }
];

export const recommendations: SkillRecommendation[] = [
  {
    skill: "Deep Learning",
    currentLevel: 45,
    targetLevel: 70,
    priority: "High",
    timeToAcquire: "3-4 months",
    courses: ["Neural Networks Fundamentals", "TensorFlow Certification"]
  },
  {
    skill: "Cloud Platforms",
    currentLevel: 55,
    targetLevel: 75,
    priority: "Medium", 
    timeToAcquire: "2-3 months",
    courses: ["AWS Solutions Architect", "Azure Data Engineer"]
  },
  {
    skill: "MLOps",
    currentLevel: 30,
    targetLevel: 65,
    priority: "High",
    timeToAcquire: "4-5 months",
    courses: ["MLOps Engineering", "Docker & Kubernetes"]
  }
];
