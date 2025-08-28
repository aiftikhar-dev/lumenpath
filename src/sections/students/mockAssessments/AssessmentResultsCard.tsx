import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Award, 
  CheckCircle, 
  Target, 
  User, 
  TrendingUp, 
  ArrowRight, 
  FileText 
} from "lucide-react";
import { AssessmentType, AssessmentResult } from "@/types/student/mock-assessments";

interface AssessmentResultsCardProps {
  assessment: AssessmentType;
  result: AssessmentResult;
  onBackToAssessments: () => void;
}

const AssessmentResultsCard = ({ 
  assessment, 
  result, 
  onBackToAssessments 
}: AssessmentResultsCardProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Award className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Assessment Complete!</h2>
        <p className="text-muted-foreground">
          Your {assessment.title.toLowerCase()} results are ready
        </p>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {assessment.id === 'personal' ? result.type : `Score: ${result.score}%`}
          </CardTitle>
          {assessment.id !== 'personal' && (
            <CardDescription className="text-lg font-semibold">
              Level: {result.level}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {assessment.id !== 'personal' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Performance</span>
                <span className="font-semibold">{result.score}%</span>
              </div>
              <Progress value={result.score || 0} className="h-3" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-700 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {assessment.id === 'personal' ? 'Key Traits' : 'Strengths'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {(assessment.id === 'personal' ? result.traits : result.strengths)?.map((item, index) => (
                  <Badge key={index} className="bg-green-100 text-green-800 border-green-300">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            {assessment.id !== 'personal' && (
              <div className="space-y-3">
                <h4 className="font-semibold text-orange-700 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Areas for Improvement
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.improvements?.map((item, index) => (
                    <Badge key={index} className="bg-orange-100 text-orange-700 border-orange-300">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {assessment.id === 'personal' && (
            <div className="space-y-3">
              <h4 className="font-semibold text-primary flex items-center gap-2">
                <User className="w-4 h-4" />
                Work Style
              </h4>
              <p className="text-muted-foreground bg-background p-3 rounded-lg border">
                {result.workStyle}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="font-semibold text-primary flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Recommendations
            </h4>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={onBackToAssessments} variant="outline" className="flex-1">
              Back to Assessments
            </Button>
            <Button className="flex-1">
              <FileText className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentResultsCard;
