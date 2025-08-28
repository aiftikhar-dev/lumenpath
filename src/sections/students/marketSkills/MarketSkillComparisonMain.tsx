import { useState } from "react";
import { 
  roles, 
  regions, 
  userSkills, 
  marketData, 
  jobMarketTrends, 
  recommendations 
} from "@/mock-data/student/market-skill-comparison";
import MarketSkillHeader from "./MarketSkillHeader";
import MarketOverviewCards from "./MarketOverviewCards";
import SkillsComparisonChart from "./SkillsComparisonChart";
import JobMarketTrends from "./JobMarketTrends";
import DetailedSkillsAnalysis from "./DetailedSkillsAnalysis";
import SkillDevelopmentRecommendations from "./SkillDevelopmentRecommendations";

const MarketSkillComparisonMain = () => {
  const [selectedRole, setSelectedRole] = useState("data-scientist");
  const [selectedRegion, setSelectedRegion] = useState("dubai");

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  return (
    <div className="space-y-6">
      <MarketSkillHeader
        selectedRole={selectedRole}
        selectedRegion={selectedRegion}
        roles={roles}
        regions={regions}
        onRoleChange={handleRoleChange}
        onRegionChange={handleRegionChange}
      />

      <MarketOverviewCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillsComparisonChart marketData={marketData} />
        <JobMarketTrends jobMarketTrends={jobMarketTrends} />
      </div>

      <DetailedSkillsAnalysis 
        userSkills={userSkills} 
        selectedRegion={selectedRegion} 
      />

      <SkillDevelopmentRecommendations recommendations={recommendations} />
    </div>
  );
};

export default MarketSkillComparisonMain;
