import QuickStats from "@/components/QuickStats";
import WelcomeBanner from "@/components/WelcomeBanner";
import MockAssessmentsMain from "@/sections/students/mockAssessments/MockAssessmentsMain";
import { useState } from "react";

const MockAssessmentsView = () => {
  const [assessmentStats] = useState({
    totalAssessments: 24,
    completedAssessments: 18,
    averageScore: 78,
    currentStreak: 5,
  });

  return (
    <div className="space-y-6">
      <WelcomeBanner
        userName="Ahmad"
        currentGoal="AI Researcher"
        overallProgress={34}
      />

      <QuickStats
        variant="mock-assessments"
        data={{
          totalAssessments: assessmentStats.totalAssessments,
          completedAssessments: assessmentStats.completedAssessments,
          averageScore: assessmentStats.averageScore,
          currentStreak: assessmentStats.currentStreak,
        }}
      />

      <MockAssessmentsMain />
    </div>
  );
};

export default MockAssessmentsView;
