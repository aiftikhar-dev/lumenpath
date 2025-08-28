import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { AssessmentQuestion } from "@/types/student/mock-assessments";

interface AssessmentQuestionCardProps {
  question: AssessmentQuestion;
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer: number | undefined;
  onAnswerSelect: (questionIndex: number, answerIndex: number) => void;
  onNextQuestion: () => void;
  onExitAssessment: () => void;
}

const AssessmentQuestionCard = ({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNextQuestion,
  onExitAssessment
}: AssessmentQuestionCardProps) => {
  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'multiple': return 'Multiple Choice';
      case 'reading': return 'Reading Comprehension';
      case 'personality': return 'Personality';
      default: return type;
    }
  };

  return (
    <Card className="border-primary/20">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge variant="outline" className="mb-4">
              {getQuestionTypeLabel(question.type)}
            </Badge>
            <h3 className="text-xl font-semibold leading-relaxed">
              {question.question}
            </h3>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className="w-full text-left justify-start p-4 h-auto"
                onClick={() => onAnswerSelect(currentQuestion, index)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-wrap">{option}</span>
                </div>
              </Button>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={onExitAssessment}
            >
              Exit Assessment
            </Button>
            <Button 
              onClick={onNextQuestion}
              disabled={selectedAnswer === undefined}
              className="min-w-32"
            >
              {currentQuestion === totalQuestions - 1 ? 'Finish' : 'Next Question'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentQuestionCard;
