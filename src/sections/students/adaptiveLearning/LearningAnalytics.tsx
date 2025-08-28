import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";

interface SkillProgress {
  name: string;
  progress: number;
  status: string;
}

interface LearningAnalyticsProps {
  skills?: SkillProgress[];
}

const LearningAnalytics = ({ skills }: LearningAnalyticsProps) => {
  const defaultSkills: SkillProgress[] = [
    {
      name: "Mathematics",
      progress: 45,
      status: "Needs improvement"
    },
    {
      name: "Statistics",
      progress: 62,
      status: "Good progress"
    },
    {
      name: "Programming",
      progress: 78,
      status: "Strong area"
    }
  ];

  const displaySkills = skills || defaultSkills;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="w-5 h-5 mr-2 text-ai-accent" />
          Learning Analytics
        </CardTitle>
        <CardDescription>
          Your performance metrics and progress tracking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {displaySkills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-muted-foreground">{skill.progress}%</span>
            </div>
            <Progress value={skill.progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {skill.status}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LearningAnalytics;
