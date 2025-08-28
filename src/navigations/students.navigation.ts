export const studentNavigation = [
  {
    id: "dashboard",
    title: "Dashboard",
    path: "/students/dashboard",
    icon: "Home",
    description: "Overview of your learning progress",
  },
  {
    id: "adaptive-learning",
    title: "Adaptive Learning",
    path: "/students/adaptive-learning",
    icon: "Brain",
    description: "AI-powered personalized learning",
  },
  {
    id: "study-buddies",
    title: "Study Buddies",
    path: "/students/study-buddies",
    icon: "Users",
    description: "Connect with fellow learners",
  },

  {
    id: "skill-analysis",
    title: "Skill Analysis",
    path: "/students/skill-analysis",
    icon: "BarChart3",
    description: "Analyze your skill gaps",
  },
  {
    id: "market-skills-comparison",
    title: "Market Skills Comparison",
    path: "/students/market-skills-comparison",
    icon: "Target",
    description: "Compare skills with market demands",
  },
  {
    id: "ai-career-counselor",
    title: "AI Career Counselor",
    path: "/students/ai-career-counselor",
    icon: "MessageSquare",
    description: "Get career guidance from AI",
  },
  {
    id: "ai-educational-counselor",
    title: "AI Educational Counselor",
    path: "/students/ai-educational-counselor",
    icon: "GraduationCap",
    description: "Get academic guidance from AI",
  },
  {
    id: "mock-interviews",
    title: "Mock Interviews",
    path: "/students/mock-interviews",
    icon: "Video",
    description: "Practice interviews with AI",
  },
  {
    id: "job-matching",
    title: "Job Matching",
    path: "/students/job-matching",
    icon: "Briefcase",
    description: "Get job matching from AI",
  },
  {
    id: "mock-assessments",
    title: "Mock Assessments",
    path: "/students/mock-assessments",
    icon: "FileText",
    description: "Practice assessments with AI",
  },
  {
    id: "profile",
    title: "Profile",
    path: "/students/profile",
    icon: "User",
    description: "View your profile",
  },
  {
    id: "resume-builder",
    title: "Resume Builder",
    path: "/students/resume-builder",
    icon: "FileText",
    description: "Build your resume with AI",
  },

  // Add more navigation items as needed
];

export type StudentNavigationItem = (typeof studentNavigation)[0];
