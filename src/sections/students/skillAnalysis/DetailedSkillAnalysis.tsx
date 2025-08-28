import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import SkillGapAnalysis from "@/components/SkillGapAnalysis";

interface LearnerProfile {
  currentSkills: string[];
  targetSkills: string[];
  experience: string[];
  goal: string;
}

interface DetailedSkillAnalysisProps {
  learnerProfile?: LearnerProfile;
}

const DetailedSkillAnalysis = ({ learnerProfile }: DetailedSkillAnalysisProps) => {
  const defaultLearnerProfile: LearnerProfile = {
    currentSkills: ["Python Basics", "Statistics", "Linear Algebra"],
    targetSkills: ["Machine Learning", "Deep Learning", "Neural Networks", "Computer Vision"],
    experience: ["Beginner"],
    goal: "AI Researcher"
  };

  const displayLearnerProfile = learnerProfile || defaultLearnerProfile;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-ai-primary" />
          Detailed Skill Analysis
        </CardTitle>
        <CardDescription>
          AI-powered analysis of your current skills and learning path
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SkillGapAnalysis learnerProfile={displayLearnerProfile} />
      </CardContent>
    </Card>
  );
};

export default DetailedSkillAnalysis;
