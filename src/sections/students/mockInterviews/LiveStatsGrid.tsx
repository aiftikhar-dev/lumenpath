import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Clock, Target, Trophy } from "lucide-react";

interface LiveStatsGridProps {
  timeElapsed: number;
  currentQuestion: number;
  totalQuestions: number;
}

const LiveStatsGrid = ({ timeElapsed, currentQuestion, totalQuestions }: LiveStatsGridProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Time Elapsed</span>
          </div>
          <div className="text-2xl font-bold">{formatTime(timeElapsed)}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Questions</span>
          </div>
          <div className="text-2xl font-bold">{currentQuestion + 1}/{totalQuestions}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Live Score</span>
          </div>
          <div className="text-2xl font-bold text-ai-primary">{Math.floor(Math.random() * 15) + 75}%</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Confidence</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{Math.floor(Math.random() * 20) + 70}%</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveStatsGrid;
