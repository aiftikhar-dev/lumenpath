import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useOnboarding } from "@/contexts/StudentOnboardingContext";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import React from "react";

interface OnBoardingLayoutProps {
  children: React.ReactNode;
}

function OnBoardingLayout({ children }: OnBoardingLayoutProps) {
  const {
    currentPage,
    availablePages,
    handleNext,
    handlePrevious,
    canGoToPreviousPage,
  } = useOnboarding();

  // Calculate progress based on current page position
  const currentPageIndex = availablePages.indexOf(currentPage);
  const progress = ((currentPageIndex + 1) / availablePages.length) * 100;


  // Get page-specific information
  const getPageInfo = () => {
    switch (currentPage) {
      case "confirmation":
        return {
          title: "Welcome to Your Learning Journey",
          description: "Let's get started by understanding your learning goals",
          stepText: "Page 0 of 4"
        };
      case "learning-path":
        return {
          title: "Learning Path Selection",
          description: "Choose your preferred learning approach and pace",
          stepText: "Page 1 of 4"
        };
      case "assessment":
        return {
          title: "Skills Assessment",
          description: "Let's evaluate your current knowledge and skills",
          stepText: "Page 2 of 4"
        };
      case "profile-setup":
        return {
          title: "Profile Setup",
          description: "Complete your learning profile and preferences",
          stepText: "Page 3 of 4"
        };
      case "completion":
        return {
          title: "Almost There!",
          description: "Review your selections and generate your learning path",
          stepText: "Page 4 of 4"
        };
      default:
        return {
          title: "AI-Powered Learning Path",
          description: "Let's personalize your learning journey based on your goals and experience",
          stepText: "Page 0 of 4"
        };
    }
  };

  const pageInfo = getPageInfo();
  const isLastPage = currentPage === availablePages[availablePages.length - 1];

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
            {pageInfo.title}
          </CardTitle>
          <CardDescription>
            {pageInfo.description}
          </CardDescription>
          <div className="mt-4">
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground mt-2">
              {pageInfo.stepText}
            </p>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <div className="flex justify-between p-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={!canGoToPreviousPage()}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-ai-primary to-ai-accent text-white"
          >
            {isLastPage ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Generate My Path
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default OnBoardingLayout;
