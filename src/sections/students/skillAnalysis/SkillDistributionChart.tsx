import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart } from "lucide-react";
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { PieData } from "@/types/student/skill-gap-analysis";

interface SkillDistributionChartProps {
  pieData: PieData[];
  strongSkills: number;
  improvementSkills: number;
  criticalGaps: number;
}

const SkillDistributionChart = ({ pieData, strongSkills, improvementSkills, criticalGaps }: SkillDistributionChartProps) => {
  const COLORS = ['hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)', 'hsl(0, 84%, 60%)'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="w-5 h-5" />
          Skill Distribution Analysis
        </CardTitle>
        <CardDescription>Detailed breakdown of your skill readiness</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <RechartsPieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              paddingAngle={8}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} skills`, name]} />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
        
        {/* Detailed breakdown */}
        <div className="mt-4 space-y-3 border-t pt-4">
          <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium">Market-Ready Skills</span>
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-700">
              {strongSkills} skills (Gap ≤ 20%)
            </Badge>
          </div>
          <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm font-medium">Enhancement Needed</span>
            </div>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
              {improvementSkills} skills (Gap 21-50%)
            </Badge>
          </div>
          <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm font-medium">Critical Development</span>
            </div>
            <Badge variant="outline" className="bg-red-100 text-red-700">
              {criticalGaps} skills (Gap &gt; 50%)
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillDistributionChart;
