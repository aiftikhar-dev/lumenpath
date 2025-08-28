import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface WelcomeBannerProps {
  userName: string;
  currentGoal: string;
  overallProgress: number;
}

const WelcomeBanner = ({ userName, currentGoal, overallProgress }: WelcomeBannerProps) => {
  return (
    <Card className="mb-8 bg-gradient-to-r from-ai-primary/10 to-ai-accent/10 border-ai-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome, {userName}!</h1>
            <p className="text-muted-foreground">
              Your AI learning journey continues. You're {overallProgress}% closer to becoming an {currentGoal}.
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-ai-primary">{overallProgress}%</div>
            <div className="text-sm text-muted-foreground">Goal Progress</div>
          </div>
        </div>
        <Progress value={overallProgress} className="mt-4" />
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;
