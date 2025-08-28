import { CareerPath, Skill } from "@/types/student/ai-career-counselor";

export const careerPaths: CareerPath[] = [
  { title: "AI/ML Engineer", match: "95%", growth: "+23% by 2030", salary: "$120k-180k" },
  { title: "Data Scientist", match: "88%", growth: "+22% by 2030", salary: "$100k-160k" },
  { title: "DevOps Engineer", match: "82%", growth: "+20% by 2030", salary: "$95k-150k" },
  { title: "Cloud Architect", match: "78%", growth: "+15% by 2030", salary: "$130k-200k" }
];

export const skills: Skill[] = [
  { name: "Python", level: 85, demand: "High" },
  { name: "Machine Learning", level: 70, demand: "Critical" },
  { name: "Data Analysis", level: 80, demand: "High" },
  { name: "Communication", level: 75, demand: "Essential" }
];

export const quickQuestions = [
  "What are the highest paying tech careers?",
  "How do I transition to AI/ML?",
  "What skills are most in-demand?",
  "Create my career roadmap"
];
