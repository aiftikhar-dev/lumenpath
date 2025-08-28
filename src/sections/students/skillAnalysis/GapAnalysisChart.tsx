import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { BarData } from "@/types/student/skill-gap-analysis";

interface GapAnalysisChartProps {
  barData: BarData[];
}

const GapAnalysisChart = ({ barData }: GapAnalysisChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Gap Breakdown</CardTitle>
        <CardDescription>Detailed analysis of each skill gap</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="gap" fill="hsl(0, 84%, 60%)" name="Skill Gap %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GapAnalysisChart;
