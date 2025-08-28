import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface AssessmentProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
}

const AssessmentProgress = ({ currentQuestion, totalQuestions, timeLeft }: AssessmentProgressProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="space-y-4">
      {/* Header with Progress */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Assessment in Progress</h2>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {totalQuestions}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Time Remaining</div>
          <div className="text-lg font-bold text-primary flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
    </div>
  );
};

export default AssessmentProgress;
