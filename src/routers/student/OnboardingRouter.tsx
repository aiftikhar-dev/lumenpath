import OnBoardingLayout from "@/layouts/students/onBoardingLayout";
import { Loader2 } from "lucide-react";
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { onboardingRoutes } from "./routes";

const OnboardingConfirmation = lazy(
  () => import("@/pages/students/onboarding/OnboardingConfirmation")
);

const OnboardingProfile = lazy(
  () => import("@/pages/students/onboarding/OnboadingProfile")
);
const OnboardingCompletion = lazy(
  () => import("@/pages/students/onboarding/OnboardingCompletion")
);
const OnboardingAssessment = lazy(
  () => import("@/pages/students/onboarding/OnboardingAssessment")
);

const OnboardingLearningPath = lazy(
  () => import("@/pages/students/onboarding/OnboardingLearningPath")
);

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full flex items-center justify-center min-h-screen">
    <div className="flex items-center space-x-2">
      <Loader2 className="h-6 w-6 animate-spin" />
      <span>Loading...</span>
    </div>
  </div>
);

// Component mapping for dynamic rendering
const componentMap = {
  OnboardingConfirmation,
  OnboardingProfile,
  OnboardingCompletion,
  OnboardingAssessment,
  OnboardingLearningPath,
};

const layoutMap = {
  OnBoardingLayout,
};

// OnboardingRouter component
const OnboardingRouter = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {onboardingRoutes.map((route) => (
          <Route key={route.path} path={route.path}>
            {route.children?.map((childRoute) => {
              const Component =
                componentMap[
                  childRoute.component as keyof typeof componentMap
                ] || React.Fragment;

              const Layout =
                layoutMap[childRoute.layout as keyof typeof layoutMap] ||
                React.Fragment;

              return (
                <Route
                  key={childRoute.path}
                  path={childRoute.path}
                  element={
                    <Layout>
                      <Component />
                    </Layout>
                  }
                />
              );
            })}
          </Route>
        ))}
      
      </Routes>
    </Suspense>
  );
};

export default OnboardingRouter;
