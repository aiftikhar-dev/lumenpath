import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useOnboarding } from "@/contexts/StudentOnboardingContext";
import { Sparkles } from "lucide-react";
import React from "react";

interface OnBoardingLayoutProps {
  children: React.ReactNode;
}

function OnBoardingLayout({ children }: OnBoardingLayoutProps) {
  const { progress, step, totalSteps } = useOnboarding();

  return (
    <div className="  min-h-screen bg-background p-6 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-ai-primary to-ai-accent rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            AI-Powered Learning Path
          </CardTitle>
          <CardDescription>
            Let's personalize your learning journey based on your goals and
            experience
          </CardDescription>
          <div className="mt-4">
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground mt-2">
              Step {step} of {totalSteps}
            </p>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}

export default OnBoardingLayout;
