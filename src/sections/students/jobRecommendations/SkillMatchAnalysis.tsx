import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Target } from "lucide-react";
import { CareerPath } from "@/types/student/job-recommendations";

interface SkillMatchAnalysisProps {
  careerPath: CareerPath;
}

const SkillMatchAnalysis = ({ careerPath }: SkillMatchAnalysisProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold">Career Readiness</span>
        <span className="font-bold text-ai-primary">{careerPath.matchPercentage}%</span>
      </div>
      <Progress value={careerPath.matchPercentage} className="h-3" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-semibold text-green-700 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Your Strengths ({careerPath.yourSkills.length} skills)
          </h4>
          <div className="flex flex-wrap gap-2">
            {careerPath.yourSkills.map((skill, index) => (
              <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-100 border-green-300">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold text-red-700 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Skills to Develop ({careerPath.missingSkills.length} skills)
          </h4>
          <div className="flex flex-wrap gap-2">
            {careerPath.missingSkills.map((skill, index) => (
              <Badge key={index} variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 border-red-300">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillMatchAnalysis;
