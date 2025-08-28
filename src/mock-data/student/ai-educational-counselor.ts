import { RecommendedCourse, StudyPathPhase, LearningPreference } from "@/types/student/ai-educational-counselor";

export const recommendedCourses: RecommendedCourse[] = [
  {
    title: "Machine Learning Fundamentals",
    duration: "8 weeks",
    difficulty: "Beginner",
    rating: 4.8,
    students: "12,450",
    relevance: "98%"
  },
  {
    title: "Advanced Python Programming",
    duration: "6 weeks", 
    difficulty: "Intermediate",
    rating: 4.9,
    students: "8,920",
    relevance: "95%"
  },
  {
    title: "Data Visualization & Analytics",
    duration: "5 weeks",
    difficulty: "Beginner",
    rating: 4.7,
    students: "15,300",
    relevance: "92%"
  }
];

export const studyPath: StudyPathPhase[] = [
  { phase: "Foundation", courses: 3, duration: "4-6 weeks", status: "current" },
  { phase: "Intermediate", courses: 4, duration: "8-10 weeks", status: "upcoming" },
  { phase: "Advanced", courses: 3, duration: "6-8 weeks", status: "upcoming" },
  { phase: "Specialization", courses: 2, duration: "4-6 weeks", status: "upcoming" }
];

export const learningPreferences: LearningPreference[] = [
  { type: "Visual Learning", compatibility: "85%", icon: "👁️" },
  { type: "Hands-on Practice", compatibility: "92%", icon: "🛠️" },
  { type: "Video Content", compatibility: "78%", icon: "📺" },
  { type: "Interactive Quizzes", compatibility: "88%", icon: "🧠" }
];

export const quickQuestions = [
  "Create my learning roadmap",
  "What should I study first?",
  "How long will it take?",
  "Best courses for beginners"
];
