import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

import { SkillMetric } from "@/types/student/mock-interview";

interface SkillProgressCardProps {
  skillMetrics: SkillMetric[];
}

const SkillProgressCard = ({ skillMetrics }: SkillProgressCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Progress</CardTitle>
        <CardDescription>Your improvement across key interview skills</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {skillMetrics.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{skill.skill}</span>
              <div className="flex items-center gap-2">
                <span>{skill.score}%</span>
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {skill.improvement}
                </Badge>
              </div>
            </div>
            <Progress value={skill.score} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SkillProgressCard;
