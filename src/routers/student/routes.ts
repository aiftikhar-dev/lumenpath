

export const studentRoutes = [
  {
    path: "/",
    children: [
      { index: true, component: "Dashboard", path: "dashboard" },
      { path: "dashboard", component: "Dashboard" },
      { path: "adaptive-learning", component: "AdaptiveLearning" },
      { path: "study-buddies", component: "StudyBuddies" },
      { path: "progress", component: "Progress" },
      { path: "skill-analysis", component: "SkillAnalysis" },
      { path: "market-skills-comparison", component: "MarketSkillsComparison" },
      { path: "ai-career-counselor", component: "AICareerCounselor", provider: "CareerCounselorProvider" },  
      { path: "ai-educational-counselor", component: "AIEducationalCounselor", provider: "EducationalCounselorProvider" },
      { path: "mock-interviews", component: "MockInterviews" },
      { path: "profile", component: "Profile" },
      { path: "resume-builder", component: "ResumeBuilder" },
      { path: "mock-assessments", component: "MockAssessments" },
      { path: "job-matching", component: "JobMatching" },


      // Add more routes as needed
    ],
  },
];

export type StudentRoute = typeof studentRoutes[0];
export type StudentRouteConfig = typeof studentRoutes[0]['children'][0];
