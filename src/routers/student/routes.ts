export const studentRoutes = [
  {
    path: "/",
    children: [
      {
        index: true,
        component: "Dashboard",
        path: "dashboard",
        layout: "StudentLayout",
      },
      { path: "dashboard", component: "Dashboard", layout: "StudentLayout" },
      {
        path: "adaptive-learning",
        component: "AdaptiveLearning",
        layout: "StudentLayout",
      },
      {
        path: "study-buddies",
        component: "StudyBuddies",
        layout: "StudentLayout",
      },
      { path: "progress", component: "Progress", layout: "StudentLayout" },
      {
        path: "skill-analysis",
        component: "SkillAnalysis",
        layout: "StudentLayout",
      },
      {
        path: "market-skills-comparison",
        component: "MarketSkillsComparison",
        layout: "StudentLayout",
      },
      {
        path: "ai-career-counselor",
        component: "AICareerCounselor",
        provider: "CareerCounselorProvider",
        layout: "StudentLayout",
      },
      {
        path: "ai-educational-counselor",
        component: "AIEducationalCounselor",
        provider: "EducationalCounselorProvider",
        layout: "StudentLayout",
      },
      {
        path: "mock-interviews",
        component: "MockInterviews",
        layout: "StudentLayout",
      },
      { path: "profile", component: "Profile", layout: "StudentLayout" },
      {
        path: "resume-builder",
        component: "ResumeBuilder",
        layout: "StudentLayout",
      },
      {
        path: "mock-assessments",
        component: "MockAssessments",
        layout: "StudentLayout",
      },
      {
        path: "job-matching",
        component: "JobMatching",
        layout: "StudentLayout",
      },
      {
        path: "onboarding/*",
        component: "OnboardingRouter",
        provider: "OnboardingProvider",
        layout: "BlankLayout",
      },

      // Add more routes as needed
    ],
    
  },
];

export const onboardingRoutes = [
  {
    path: "/",
    children: [
      {
        path: "confirmation",
        component: "OnboardingConfirmation",
        layout: "BlankLayout",
      },
      {
        path: "learning-path",
        component: "OnboardingLearningPath",
        layout: "OnBoardingLayout",
      },
      {
        path: "assessment",
        component: "OnboardingAssessment",
        layout: "OnBoardingLayout",
      },
      
      {
        path: "profile-setup",
        component: "OnboardingProfile",
        layout: "OnBoardingLayout",
      },
      
      {
        path: "completion",
        component: "OnboardingCompletion",
        layout: "OnBoardingLayout",
      },
    ],
    
  },
];

export type StudentRoute = (typeof studentRoutes)[0];
export type StudentRouteConfig = (typeof studentRoutes)[0]["children"][0];

export type OnboardingRoute = (typeof onboardingRoutes)[0];
export type OnboardingRouteConfig = (typeof onboardingRoutes)[0]["children"][0];


