import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { SkillRecommendation } from "@/types/student/market-skill-comparison";

interface SkillDevelopmentRecommendationsProps {
  recommendations: SkillRecommendation[];
}

const SkillDevelopmentRecommendations = ({ recommendations }: SkillDevelopmentRecommendationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-ai-primary" />
          Skill Development Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">{rec.skill}</h4>
                <Badge variant={rec.priority === "High" ? "destructive" : "secondary"}>
                  {rec.priority}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current:</span>
                  <span>{rec.currentLevel}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target:</span>
                  <span className="text-ai-success">{rec.targetLevel}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timeline:</span>
                  <span>{rec.timeToAcquire}</span>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-2">Recommended Courses:</p>
                  {rec.courses.map((course, idx) => (
                    <div key={idx} className="text-xs bg-muted px-2 py-1 rounded mb-1">
                      {course}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillDevelopmentRecommendations;
