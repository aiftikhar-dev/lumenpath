import { SidebarProvider } from "@/components/ui/sidebar";
import OnBoardingLayout from "@/layouts/students/onBoardingLayout";
import { Loader2 } from "lucide-react";
import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Confirmation = lazy(
  () => import("@/pages/students/onboarding/confirmation")
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

// OnboardingRouter component
const OnboardingRouter = () => {
  return (
    <SidebarProvider>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="confirmation" element={
            <OnBoardingLayout>
              <Confirmation />
            </OnBoardingLayout>
          } />
          <Route path="*" element={<Navigate to="confirmation" replace />} />
        </Routes>
      </Suspense>
    </SidebarProvider>
  );
};

export default OnboardingRouter;
