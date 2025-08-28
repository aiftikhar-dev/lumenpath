import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts';
import { MarketData } from "@/types/student/market-skill-comparison";

interface SkillsComparisonChartProps {
  marketData: MarketData[];
}

const SkillsComparisonChart = ({ marketData }: SkillsComparisonChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Benchmark</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={marketData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="Your Level" dataKey="user" stroke="hsl(var(--ai-primary))" fill="hsl(var(--ai-primary))" fillOpacity={0.1} />
            <Radar name="Market Average" dataKey="market" stroke="hsl(var(--ai-secondary))" fill="hsl(var(--ai-secondary))" fillOpacity={0.1} />
            <Radar name="Industry Leaders" dataKey="industry" stroke="hsl(var(--ai-accent))" fill="hsl(var(--ai-accent))" fillOpacity={0.1} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SkillsComparisonChart;
