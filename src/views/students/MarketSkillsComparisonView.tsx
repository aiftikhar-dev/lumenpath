import QuickActions from "@/components/QuickActions";
import QuickStats from "@/components/QuickStats";
import WelcomeBanner from "@/components/WelcomeBanner";
import MarketSkillComparison from "@/sections/students/marketSkills/MarketSkillComparison";
import { useState } from "react";

const MarketSkillsComparisonView = () => {
  const [marketData] = useState({
    industry: "Technology",
    region: "Global",
    totalJobs: 1247,
    growthRate: "12%",
    timeframe: "2024"
  });

  return (
    <div className="space-y-6">
       <WelcomeBanner
        userName="Ahmad"
        currentGoal="AI Researcher"
        overallProgress={34}
      />

      <QuickStats
        variant="market"
        data={{
          industry: marketData.industry,
          region: marketData.region,
          totalJobs: marketData.totalJobs,
          growthRate: marketData.growthRate,
          timeframe: marketData.timeframe
        }}
      />

      <QuickActions currentCourses={undefined} setActiveCourse={undefined} />

      
      <MarketSkillComparison />
    </div>
  );
};

export default MarketSkillsComparisonView;
