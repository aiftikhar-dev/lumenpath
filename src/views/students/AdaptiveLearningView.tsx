import QuickActions from "@/components/QuickActions";
import QuickStats from "@/components/QuickStats";
import WelcomeBanner from "@/components/WelcomeBanner";
import AdaptiveLearningEngine from "@/sections/students/adaptiveLearning/AdaptiveLearningEngine";
import AIRecommendations from "@/sections/students/adaptiveLearning/AIRecommendations";
import LearningAnalytics from "@/sections/students/adaptiveLearning/LearningAnalytics";
import { useState } from "react";

const AdaptiveLearningView = () => {
  const [learningStats] = useState({
    currentModule: "Neural Networks",
    overallProgress: 67,
    learningEfficiency: "Optimal",
  });

  const learnerData = {
    currentModule: "Linear Algebra",
    overallProgress: 34,
    weakAreas: ["Mathematics", "Statistics"],
    strengths: ["Python", "Programming"],
  };

  return (
    <div className="space-y-6">
      <WelcomeBanner
        userName="Ahmad"
        currentGoal="AI Researcher"
        overallProgress={34}
      />

      <QuickStats
        variant="adaptive"
        data={{
          currentModule: learningStats.currentModule,
          overallProgress: learningStats.overallProgress,
          learningEfficiency: learningStats.learningEfficiency,
        }}
      />
      <QuickActions currentCourses={[]} setActiveCourse={() => {}} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AIRecommendations />
        <LearningAnalytics />
      </div>

      <AdaptiveLearningEngine  />

    </div>
  );
};

export default AdaptiveLearningView;
