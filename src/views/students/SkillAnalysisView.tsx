import QuickStats from "@/components/QuickStats";
import WelcomeBanner from "@/components/WelcomeBanner";
import DetailedSkillAnalysis from "@/sections/students/skillAnalysis/DetailedSkillAnalysis";
import { useState } from "react";

const SkillAnalysisView = () => {
  const [learnerProfile] = useState({
    experience: ["Beginner"],
    goal: "AI/ML Engineer",
    currentSkills: 8,
    targetSkills: 15,
  });

  return (
    <div className="space-y-6">
      <WelcomeBanner
        userName="Ahmad"
        currentGoal="AI Researcher"
        overallProgress={34}
      />

      <QuickStats
        variant="skills"
        data={{
          currentSkills: learnerProfile.currentSkills,
          targetSkills: learnerProfile.targetSkills,
          experience: learnerProfile.experience.join(", "),
          goal: learnerProfile.goal,
        }}
      />

      <DetailedSkillAnalysis />
    </div>
  );
};

export default SkillAnalysisView;
