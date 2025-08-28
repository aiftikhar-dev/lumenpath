import { CareerPath, LearningResources, SortOption } from "@/types/student/job-recommendations";

export const careerPaths: CareerPath[] = [
  {
    id: 1,
    title: "AI/ML Engineer",
    category: "AI",
    experience: "3-5 years",
    matchPercentage: 85,
    growth: "High Demand",
    region: "UAE - Dubai",
    requiredSkills: ["Python", "Machine Learning", "TensorFlow", "Deep Learning", "Data Analysis", "Statistics"],
    yourSkills: ["Python", "Machine Learning", "Data Analysis"],
    missingSkills: ["TensorFlow", "Deep Learning", "Statistics"],
    description: "Design and implement AI systems, develop machine learning models, and create intelligent solutions for complex business problems.",
    careerProgression: ["Junior ML Engineer", "ML Engineer", "Senior ML Engineer", "AI Architect"],
    industries: ["Technology", "Healthcare", "Finance", "E-commerce"],
    skillImportance: {
      "Python": 95,
      "Machine Learning": 90,
      "TensorFlow": 80,
      "Deep Learning": 85,
      "Data Analysis": 88,
      "Statistics": 75
    }
  },
  {
    id: 2,
    title: "Data Scientist",
    category: "Data Science",
    experience: "2-4 years",
    matchPercentage: 78,
    growth: "Very High Demand",
    region: "UAE - Abu Dhabi",
    requiredSkills: ["Python", "SQL", "Statistics", "Machine Learning", "Data Visualization", "R"],
    yourSkills: ["Python", "Statistics", "Data Visualization"],
    missingSkills: ["SQL", "Machine Learning", "R"],
    description: "Extract insights from complex datasets, build predictive models, and drive data-driven decision making across organizations.",
    careerProgression: ["Data Analyst", "Data Scientist", "Senior Data Scientist", "Chief Data Officer"],
    industries: ["Technology", "Banking", "Retail", "Healthcare"],
    skillImportance: {
      "Python": 92,
      "SQL": 88,
      "Statistics": 95,
      "Machine Learning": 85,
      "Data Visualization": 80,
      "R": 75
    }
  },
  {
    id: 3,
    title: "Cloud Solutions Architect",
    category: "Cloud",
    experience: "5-7 years",
    matchPercentage: 65,
    growth: "Rapidly Growing",
    region: "UAE - Dubai",
    requiredSkills: ["AWS", "Azure", "Docker", "Kubernetes", "DevOps", "System Design"],
    yourSkills: ["System Design"],
    missingSkills: ["AWS", "Azure", "Docker", "Kubernetes", "DevOps"],
    description: "Design scalable cloud infrastructure, lead digital transformation initiatives, and optimize cloud operations for enterprise clients.",
    careerProgression: ["Cloud Engineer", "Solutions Architect", "Senior Architect", "Cloud Practice Lead"],
    industries: ["Technology", "Government", "Oil & Gas", "Banking"],
    skillImportance: {
      "AWS": 90,
      "Azure": 85,
      "Docker": 78,
      "Kubernetes": 75,
      "DevOps": 82,
      "System Design": 88
    }
  },
  {
    id: 4,
    title: "Product Manager - Tech",
    category: "Product",
    experience: "4-6 years",
    matchPercentage: 72,
    growth: "High Demand",
    region: "UAE - Sharjah",
    requiredSkills: ["Product Strategy", "Data Analysis", "User Research", "Agile", "Communication", "Business Analysis"],
    yourSkills: ["Data Analysis", "Communication", "Business Analysis"],
    missingSkills: ["Product Strategy", "User Research", "Agile"],
    description: "Drive product vision and strategy, coordinate cross-functional teams, and deliver innovative solutions that meet market needs.",
    careerProgression: ["Associate PM", "Product Manager", "Senior PM", "VP of Product"],
    industries: ["Technology", "E-commerce", "Fintech", "Startups"],
    skillImportance: {
      "Product Strategy": 95,
      "Data Analysis": 85,
      "User Research": 80,
      "Agile": 75,
      "Communication": 90,
      "Business Analysis": 70
    }
  },
  {
    id: 5,
    title: "Full Stack Developer",
    category: "Software",
    experience: "2-4 years",
    matchPercentage: 82,
    growth: "Steady Demand",
    region: "UAE - Dubai",
    requiredSkills: ["JavaScript", "React", "Node.js", "Python", "SQL", "API Design"],
    yourSkills: ["JavaScript", "Python", "SQL"],
    missingSkills: ["React", "Node.js", "API Design"],
    description: "Develop end-to-end web applications, create responsive user interfaces, and build robust backend systems for diverse clients.",
    careerProgression: ["Junior Developer", "Full Stack Developer", "Senior Developer", "Tech Lead"],
    industries: ["Technology", "Startups", "E-commerce", "Digital Agencies"],
    skillImportance: {
      "JavaScript": 95,
      "React": 85,
      "Node.js": 80,
      "Python": 75,
      "SQL": 70,
      "API Design": 78
    }
  }
];

export const categories = ["All", "AI", "Data Science", "Cloud", "Product", "Software"];

export const sortOptions: SortOption[] = [
  { value: "match", label: "Best Match" },
  { value: "growth", label: "Market Growth" },
  { value: "experience", label: "Experience Level" }
];

export const learningResources: LearningResources = {
  "TensorFlow": [
    { platform: "Coursera", course: "Deep Learning Specialization", provider: "DeepLearning.AI", duration: "4 months" },
    { platform: "Google", course: "TensorFlow Developer Certificate", provider: "Google", duration: "3 months" }
  ],
  "AWS": [
    { platform: "AWS", course: "AWS Solutions Architect", provider: "Amazon", duration: "3 months" },
    { platform: "Udacity", course: "AWS Cloud Architect Nanodegree", provider: "Udacity", duration: "4 months" }
  ],
  "React": [
    { platform: "Coursera", course: "React Specialization", provider: "Meta", duration: "2 months" },
    { platform: "Udemy", course: "Complete React Developer", provider: "Udemy", duration: "6 weeks" }
  ],
  "Product Strategy": [
    { platform: "Coursera", course: "Product Management", provider: "University of Virginia", duration: "6 weeks" },
    { platform: "edX", course: "Product Strategy", provider: "Boston University", duration: "8 weeks" }
  ],
  "SQL": [
    { platform: "Coursera", course: "SQL for Data Science", provider: "UC Davis", duration: "4 weeks" },
    { platform: "edX", course: "Introduction to SQL", provider: "IBM", duration: "5 weeks" }
  ]
};
