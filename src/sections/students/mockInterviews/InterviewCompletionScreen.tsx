import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckCircle, Lightbulb, TrendingUp } from "lucide-react";

interface InterviewCompletionScreenProps {
  interviewScore: number;
  timeElapsed: number;
  currentQuestion: number;
  interviewTitle?: string;
  onReturnToDashboard: () => void;
  onPracticeAgain: () => void;
}

const InterviewCompletionScreen = ({
  interviewScore,
  timeElapsed,
  currentQuestion,
  interviewTitle,
  onReturnToDashboard,
  onPracticeAgain
}: InterviewCompletionScreenProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const feedback = {
    strengths: [
      "Clear and articulate communication",
      "Strong technical knowledge demonstrated",
      "Good problem-solving approach",
      "Confident delivery of responses"
    ],
    improvements: [
      "Could provide more specific examples",
      "Consider structuring answers using STAR method",
      "Practice explaining complex concepts more simply",
      "Work on maintaining eye contact"
    ],
    recommendations: [
      "Practice more system design questions",
      "Review behavioral interview frameworks",
      "Work on presentation skills",
      "Study industry-specific case studies"
    ]
  };

  return (
    <div className="space-y-6">
      <Card className="border-ai-primary/20 bg-gradient-to-r from-ai-primary/5 to-ai-accent/5">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Interview Completed!</CardTitle>
          <CardDescription>
            Your AI-powered {interviewTitle} session has been analyzed
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Score Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-ai-primary">{interviewScore}%</div>
            <p className="text-sm text-muted-foreground">Overall Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">{formatTime(timeElapsed)}</div>
            <p className="text-sm text-muted-foreground">Duration</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">{currentQuestion + 1}</div>
            <p className="text-sm text-muted-foreground">Questions Answered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">B+</div>
            <p className="text-sm text-muted-foreground">Performance Grade</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-green-200 bg-green-50/30">
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Your Strengths
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {feedback.strengths.map((strength, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">{strength}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50/30">
          <CardHeader>
            <CardTitle className="text-yellow-700 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {feedback.improvements.map((improvement, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span className="text-sm">{improvement}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-ai-primary" />
            AI-Powered Recommendations
          </CardTitle>
          <CardDescription>
            Personalized suggestions to improve your interview performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {feedback.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="w-6 h-6 bg-ai-primary/20 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-ai-primary">{index + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm">{recommendation}</p>
              </div>
              <Button size="sm" variant="outline">
                <BookOpen className="w-3 h-3 mr-1" />
                Learn More
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button onClick={onReturnToDashboard}>
          Return to Dashboard
        </Button>
        <Button variant="outline" onClick={onPracticeAgain}>
          Practice Again
        </Button>
      </div>
    </div>
  );
};

export default InterviewCompletionScreen;
