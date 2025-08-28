import { InterviewType, PastInterview, SkillMetric, InterviewStats, MockQuestions } from "@/types/student/mock-interview";

export const interviewTypes: InterviewType[] = [
  {
    id: "technical",
    title: "Technical Interview",
    description: "Coding challenges and technical problem solving",
    duration: "45-60 mins",
    difficulty: "Advanced",
    topics: ["Data Structures", "Algorithms", "System Design", "Coding"],
    companies: ["Google", "Microsoft", "Amazon", "Meta"]
  },
  {
    id: "behavioral",
    title: "Behavioral Interview",
    description: "Communication skills and cultural fit assessment",
    duration: "30-45 mins",
    difficulty: "Intermediate",
    topics: ["Leadership", "Teamwork", "Problem Solving", "Communication"],
    companies: ["All Companies"]
  },
  {
    id: "case-study",
    title: "Case Study Interview",
    description: "Business problem analysis and strategic thinking",
    duration: "60-90 mins",
    difficulty: "Advanced",
    topics: ["Business Analysis", "Strategy", "Problem Solving", "Presentation"],
    companies: ["McKinsey", "BCG", "Bain", "Deloitte"]
  }
];

export const pastInterviews: PastInterview[] = [
  {
    id: 1,
    type: "Technical Interview",
    company: "Google",
    date: "2024-01-15",
    score: 85,
    feedback: "Strong algorithmic thinking, needs improvement in system design",
    duration: "52 mins"
  },
  {
    id: 2,
    type: "Behavioral Interview",
    company: "Microsoft",
    date: "2024-01-10",
    score: 92,
    feedback: "Excellent communication and leadership examples",
    duration: "38 mins"
  },
  {
    id: 3,
    type: "Case Study Interview",
    company: "McKinsey",
    date: "2024-01-05",
    score: 78,
    feedback: "Good analytical approach, could improve presentation skills",
    duration: "75 mins"
  }
];

export const skillMetrics: SkillMetric[] = [
  { skill: "Technical Knowledge", score: 85, improvement: "+5%" },
  { skill: "Communication", score: 92, improvement: "+8%" },
  { skill: "Problem Solving", score: 78, improvement: "+12%" },
  { skill: "Confidence", score: 80, improvement: "+7%" }
];

export const interviewStats: InterviewStats = {
  interviewsCompleted: 12,
  averageScore: "85%",
  practiceTime: "8h 45m",
  bestScore: "92%"
};

export const mockQuestions: MockQuestions = {
  technical: [
    "Explain the difference between supervised and unsupervised learning.",
    "How would you optimize a slow database query?",
    "Describe the time complexity of different sorting algorithms.",
    "What is the difference between React hooks and class components?",
    "How would you design a scalable system for 1 million users?",
    "Explain the concept of overfitting in machine learning.",
    "What are the benefits and drawbacks of microservices architecture?",
    "How would you implement a recommendation system?"
  ],
  behavioral: [
    "Tell me about a challenging project you worked on recently.",
    "Describe a time when you had to work with a difficult team member.",
    "How do you handle tight deadlines and pressure?",
    "Give an example of when you had to learn a new technology quickly.",
    "Describe a situation where you had to make a difficult decision.",
    "Tell me about a time you received constructive criticism.",
    "How do you stay updated with the latest technologies?",
    "Describe your approach to problem-solving."
  ],
  "case-study": [
    "A client's revenue has dropped 20% over the last quarter. How would you investigate?",
    "Design a strategy to increase user engagement for a social media app.",
    "How would you prioritize features for a new product launch?",
    "A competitor just launched a similar product. What's your response strategy?",
    "How would you approach market entry in a new geographical region?",
    "Design a cost reduction strategy without affecting product quality.",
    "How would you handle a PR crisis for your company?",
    "Develop a go-to-market strategy for an AI-powered product."
  ]
};
