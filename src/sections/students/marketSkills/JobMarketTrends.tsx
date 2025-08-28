import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts';
import { JobMarketTrend } from "@/types/student/market-skill-comparison";

interface JobMarketTrendsProps {
  jobMarketTrends: JobMarketTrend[];
}

const JobMarketTrends = ({ jobMarketTrends }: JobMarketTrendsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Market Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={jobMarketTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="openings" stroke="hsl(var(--ai-success))" name="Job Openings" />
            <Line type="monotone" dataKey="applications" stroke="hsl(var(--ai-warning))" name="Applications" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default JobMarketTrends;
