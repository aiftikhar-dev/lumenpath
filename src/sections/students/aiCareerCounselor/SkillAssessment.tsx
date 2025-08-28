import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Skill } from "@/types/student/ai-career-counselor";

interface SkillAssessmentProps {
  skills: Skill[];
}

const SkillAssessment = ({ skills }: SkillAssessmentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-ai-accent" />
          Skill Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span>{skill.name}</span>
              <span className="text-muted-foreground">{skill.level}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-ai-primary h-2 rounded-full"
                style={{ width: `${skill.level}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Market Demand: {skill.demand}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SkillAssessment;
