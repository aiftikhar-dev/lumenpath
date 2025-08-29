import { SidebarProvider } from "@/components/ui/sidebar";
import CareerCounselorProvider from "@/contexts/CareerCounselorContext";
import EducationalCounselorProvider from "@/contexts/EducationalCounselorContext";
import { StudentLayout } from "@/layouts/students/layout";
import { Loader2 } from "lucide-react";
import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { studentRoutes } from "./routes";
import { OnboardingProvider } from "@/contexts/StudentOnboardingContext";
import BlankLayout from "@/layouts/BlankLayout";

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

const JobMatching = lazy(() => import("@/pages/students/JobRecommendations"));
const OnboardingRouter = lazy(() => import("./OnboardingRouter"));

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
  OnboardingRouter,
};

const providerMap = {
  CareerCounselorProvider,
  EducationalCounselorProvider,
  OnboardingProvider,
};

const layoutMap = {
  StudentLayout,
  BlankLayout,
};

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full flex items-center justify-center min-h-screen">
    <div className="flex items-center space-x-2">
      <Loader2 className="h-6 w-6 animate-spin" />
      <span>Loading...</span>
    </div>
  </div>
);

// StudentRouter component
const StudentRouter = () => {
  console.log({ studentRoutes });

  return (
    <SidebarProvider>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {studentRoutes.map((route) => (
            <Route key={route.path} path={route.path}>
              {route.children?.map((childRoute) => {
                const Component =
                  componentMap[
                    childRoute.component as keyof typeof componentMap
                  ] || React.Fragment;
                const Provider =
                  providerMap[
                    childRoute.provider as keyof typeof providerMap
                  ] || React.Fragment;

                const Layout =
                  layoutMap[childRoute.layout as keyof typeof layoutMap] ||
                  React.Fragment;

                if (childRoute.index) {
                  return (
                    <Route
                      key={childRoute.path || "index"}
                      index
                      element={
                        <Layout>
                          <Provider>
                            <Component />
                          </Provider>
                        </Layout>
                      }
                    />
                  );
                }

                return (
                  <Route
                    key={childRoute.path}
                    path={childRoute.path}
                    element={
                      <Layout>
                        <Provider>
                          <Component />
                        </Provider>
                      </Layout>
                    }
                  />
                );
              })}
            </Route>
          ))}
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </SidebarProvider>
  );
};

export default StudentRouter;
