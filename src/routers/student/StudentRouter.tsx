import { Fragment, lazy, Suspense, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { studentRoutes } from "./routes";
import { Loader2 } from "lucide-react";
import { StudentSidebar } from "@/components/StudentSidebar";
import { StudentAIAssistant } from "@/components/StudentAIAssistant";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { studentNavigation } from "@/navigations/students.navigation";
import React from "react";

// Lazy imports for all student pages
const Dashboard = lazy(() => import("@/pages/students/Dashboard"));
const AdaptiveLearning = lazy(
  () => import("@/pages/students/AdaptiveLearning")
);
const StudyBuddies = lazy(() => import("@/pages/students/StudyBuddies"));
const SkillAnalysis = lazy(() => import("@/pages/students/SkillAnalysis"));
const MarketSkillsComparison = lazy(
  () => import("@/pages/students/MarketSkillsComparison")
);
const AICareerCounselor = lazy(
  () => import("@/pages/students/AICareerCounselor")
);
const AIEducationalCounselor = lazy(
  () => import("@/pages/students/AIEducationalCounselor")
);
const MockInterviews = lazy(() => import("@/pages/students/MockInterviews"));

const Profile = lazy(() => import("@/pages/students/Profile"));
const ResumeBuilder = lazy(() => import("@/pages/students/ResumeBuilder"));
const MockAssessments = lazy(() => import("@/pages/students/MockAssessments"));
const Onboarding = lazy(() => import("@/pages/students/Onboarding"));
const JobMatching = lazy(() => import("@/pages/students/JobRecommendations"));
import CareerCounselorProvider from "@/contexts/CareerCounselorContext";
import EducationalCounselorProvider from "@/contexts/EducationalCounselorContext";

// Component mapping for dynamic rendering
const componentMap = {
  Dashboard,
  AdaptiveLearning,
  StudyBuddies,
  SkillAnalysis,
  MarketSkillsComparison,
  AICareerCounselor,
  AIEducationalCounselor,
  MockInterviews,
  Profile,
  ResumeBuilder,
  MockAssessments,
  JobMatching,
};

const providerMap = {
  CareerCounselorProvider,
  EducationalCounselorProvider,
};

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex items-center space-x-2">
      <Loader2 className="h-6 w-6 animate-spin" />
      <span>Loading...</span>
    </div>
  </div>
);

// StudentRouter component
const StudentRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Get current active tab from URL path
  const getCurrentTab = () => {
    const path = location.pathname;
    const tab = path.split("/").pop();

    // Map URL paths to tab IDs
    const pathToTabMap: { [key: string]: string } = {
      dashboard: "dashboard",
      "adaptive-learning": "adaptive-learning",
      "study-buddies": "study-buddies",
      progress: "progress",
      "skill-analysis": "skill-analysis",
      "market-skills": "market-skills",
      "ai-career-counselor": "ai-career-counselor",
      "ai-educational-counselor": "ai-educational-counselor",
      "mock-interviews": "mock-interviews",
      "job-recommendations": "job-recommendations",
      profile: "profile",
      "resume-builder": "resume-builder",
      "mock-assessments": "mock-assessments",
    };

    return pathToTabMap[tab || ""] || "dashboard";
  };

  const [activeTab, setActiveTab] = useState(getCurrentTab);

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);

    // Find the navigation item to get the path
    const navItem = studentNavigation.find((item) => item.id === tabValue);
    if (navItem) {
      // Navigate to the corresponding route
      navigate(`/student/${navItem.id}`);
    }
  };

  // Update active tab when location changes
  React.useEffect(() => {
    setActiveTab(getCurrentTab());
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <StudentSidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onShowOnboarding={() => {}}
        />
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center border-b px-6">
            <SidebarTrigger />
            <h1 className="ml-4 text-xl font-semibold">Student Portal</h1>
          </header>
          <main className="flex-1 p-6">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {studentRoutes.map((route) => (
                  <Route key={route.path} path={route.path}>
                    {route.children?.map((childRoute) => {
                      const Component =
                        componentMap[
                          childRoute.component as keyof typeof componentMap
                        ];
                      const Provider =
                        providerMap[
                          childRoute.provider as keyof typeof providerMap
                        ] ||Fragment;

                      if (childRoute.index) {
                        return (
                          <Route
                            key={childRoute.path || "index"}
                            index
                            element={
                              <Provider>
                                <Component />
                              </Provider>
                            }
                          />
                        );
                      }

                      return (
                        <Route
                          key={childRoute.path}
                          path={childRoute.path}
                          element={
                            <Provider>
                              <Component />
                            </Provider>
                          }
                        />
                      );
                    })}
                  </Route>
                ))}
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </Suspense>
          </main>

          {/* AI Assistant */}
          <StudentAIAssistant />
        </div>
      </div>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </SidebarProvider>
  );
};

export default StudentRouter;
