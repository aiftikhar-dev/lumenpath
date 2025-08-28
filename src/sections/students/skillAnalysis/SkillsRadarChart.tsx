import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { RadarData } from "@/types/student/skill-gap-analysis";

interface SkillsRadarChartProps {
  radarData: RadarData[];
  selectedDomain: string;
}

const SkillsRadarChart = ({ radarData, selectedDomain }: SkillsRadarChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          {selectedDomain} - Skill Radar Analysis
        </CardTitle>
        <CardDescription>
          Visual comparison of your skills vs market demand
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="Market Demand"
              dataKey="Market Demand"
              stroke="hsl(245, 82%, 67%)"
              fill="hsl(245, 82%, 67%)"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Radar
              name="Your Level"
              dataKey="Your Level"
              stroke="hsl(15, 85%, 65%)"
              fill="hsl(15, 85%, 65%)"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SkillsRadarChart;
