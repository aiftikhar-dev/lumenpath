import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { InterviewStats } from "@/types/student/mock-interview";

interface InterviewStatsCardProps {
  stats: InterviewStats;
}
const InterviewStatsCard = ({ stats }: InterviewStatsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Statistics</CardTitle>
        <CardDescription>Your overall interview performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-ai-primary">{stats.interviewsCompleted}</div>
            <p className="text-sm text-muted-foreground">Interviews Completed</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-ai-accent">{stats.averageScore}</div>
            <p className="text-sm text-muted-foreground">Average Score</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.practiceTime}</div>
            <p className="text-sm text-muted-foreground">Practice Time</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.bestScore}</div>
            <p className="text-sm text-muted-foreground">Best Score</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewStatsCard;
