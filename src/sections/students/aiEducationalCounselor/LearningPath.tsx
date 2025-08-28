import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { StudyPathPhase } from "@/types/student/ai-educational-counselor";

interface LearningPathProps {
  studyPath: StudyPathPhase[];
}

const LearningPath = ({ studyPath }: LearningPathProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-ai-primary" />
          Learning Path
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {studyPath.map((phase, index) => (
          <div key={index} className={`p-3 border rounded-lg ${
            phase.status === 'current' ? 'bg-ai-primary/5 border-ai-primary/20' : ''
          }`}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-sm">{phase.phase}</h4>
              {phase.status === 'current' && (
                <Badge variant="default" className="text-xs">
                  Current
                </Badge>
              )}
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div>{phase.courses} courses</div>
              <div>{phase.duration}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LearningPath;
