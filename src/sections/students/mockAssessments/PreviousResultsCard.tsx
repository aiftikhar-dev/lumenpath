import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { AssessmentType, AssessmentResult } from "@/types/student/mock-assessments";

interface PreviousResultsCardProps {
  assessmentTypes: AssessmentType[];
  assessmentResults: Record<string, AssessmentResult>;
}

const PreviousResultsCard = ({ assessmentTypes, assessmentResults }: PreviousResultsCardProps) => {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-primary" />
          Previous Assessment Results
        </CardTitle>
        <CardDescription>
          Track your progress and improvement over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assessmentTypes.map((assessment) => {
            const result = assessmentResults[assessment.id];
            const IconComponent = assessment.icon;
            
            return (
              <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${assessment.color} flex items-center justify-center`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">{assessment.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Last taken: 2 days ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary/10 text-primary">
                    {assessment.id === 'personal' ? result.type : `${result.score}%`}
                  </Badge>
                  <Button size="sm" variant="outline">
                    View Report
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviousResultsCard;
