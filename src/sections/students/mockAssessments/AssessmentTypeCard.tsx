import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText, Target, BookOpen, Play } from "lucide-react";
import { AssessmentType } from "@/types/student/mock-assessments";

interface AssessmentTypeCardProps {
  assessment: AssessmentType;
  onStartAssessment: (assessment: AssessmentType) => void;
}

const AssessmentTypeCard = ({ assessment, onStartAssessment }: AssessmentTypeCardProps) => {
  const IconComponent = assessment.icon;
  
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/30">
      <CardHeader>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${assessment.color} flex items-center justify-center mb-4`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-xl">{assessment.title}</CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {assessment.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{assessment.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span>{assessment.questions} questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            <span>{assessment.difficulty}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span>{assessment.category}</span>
          </div>
        </div>

        <div className="pt-2">
          <Button 
            onClick={() => onStartAssessment(assessment)}
            className="w-full"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Assessment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentTypeCard;
