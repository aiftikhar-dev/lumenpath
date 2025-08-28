import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { marketDemands } from "@/mock-data/student/skill-gap-analysis";
import { InDemandSkill, RadarData, BarData, PieData } from "@/types/student/skill-gap-analysis";
import SkillGapHeader from "./SkillGapHeader";
import DomainSelection from "./DomainSelection";
import QuickStats from "./QuickStats";
import SkillDistributionChart from "./SkillDistributionChart";
import MarketIntelligence from "./MarketIntelligence";
import SkillsRadarChart from "./SkillsRadarChart";
import GapAnalysisChart from "./GapAnalysisChart";
import DetailedSkillGapAnalysis from "./DetailedSkillGapAnalysis";
import LearningRecommendations from "./LearningRecommendations";



const SkillGapAnalysisMain = () => {
  const [selectedDomain, setSelectedDomain] = useState("AI & Machine Learning");

  const currentDomain = marketDemands.find(d => d.domain === selectedDomain);
  const strongSkills = currentDomain?.inDemandSkills.filter(s => s.gap <= 20) || [];
  const improvementSkills = currentDomain?.inDemandSkills.filter(s => s.gap > 20 && s.gap <= 50) || [];
  const criticalGaps = currentDomain?.inDemandSkills.filter(s => s.gap > 50) || [];

  // Prepare data for charts
  const radarData: RadarData[] = currentDomain?.inDemandSkills.map(skill => ({
    skill: skill.skill,
    "Market Demand": skill.demand,
    "Your Level": skill.learnerLevel,
  })) || [];

  const barData: BarData[] = currentDomain?.inDemandSkills.map(skill => ({
    skill: skill.skill,
    gap: skill.gap,
    level: skill.learnerLevel,
    demand: skill.demand
  })) || [];

  const pieData: PieData[] = [
    { name: 'Strong Skills', value: strongSkills.length, color: 'hsl(142, 76%, 36%)' },
    { name: 'Need Improvement', value: improvementSkills.length, color: 'hsl(38, 92%, 50%)' },
    { name: 'Critical Gaps', value: criticalGaps.length, color: 'hsl(0, 84%, 60%)' }
  ];

  const handleDomainChange = (domain: string) => {
    setSelectedDomain(domain);
  };

  return (
    <div className="space-y-8">
      <SkillGapHeader />

      <DomainSelection
        marketDemands={marketDemands}
        selectedDomain={selectedDomain}
        onDomainChange={handleDomainChange}
      />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="radar">Skill Radar</TabsTrigger>
          <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
          <TabsTrigger value="courses">Learning Path</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <QuickStats
            strongSkills={strongSkills.length}
            improvementSkills={improvementSkills.length}
            criticalGaps={criticalGaps.length}
            totalSkills={currentDomain?.inDemandSkills.length || 0}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkillDistributionChart
              pieData={pieData}
              strongSkills={strongSkills.length}
              improvementSkills={improvementSkills.length}
              criticalGaps={criticalGaps.length}
            />
            <MarketIntelligence currentDomain={currentDomain} />
          </div>
        </TabsContent>

        <TabsContent value="radar" className="space-y-6">
          <SkillsRadarChart
            radarData={radarData}
            selectedDomain={selectedDomain}
          />
        </TabsContent>

        <TabsContent value="gaps" className="space-y-6">
          <GapAnalysisChart barData={barData} />
          <DetailedSkillGapAnalysis inDemandSkills={currentDomain?.inDemandSkills || []} />
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <LearningRecommendations
            criticalGaps={criticalGaps}
            improvementSkills={improvementSkills}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillGapAnalysisMain;
