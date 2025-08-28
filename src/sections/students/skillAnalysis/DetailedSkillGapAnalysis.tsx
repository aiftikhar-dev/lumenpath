import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lightbulb } from "lucide-react";
import { InDemandSkill } from "@/types/student/skill-gap-analysis";

interface DetailedSkillGapAnalysisProps {
  inDemandSkills: InDemandSkill[];
}

const DetailedSkillGapAnalysis = ({ inDemandSkills }: DetailedSkillGapAnalysisProps) => {
  return (
    <div className="space-y-4">
      {inDemandSkills.map((skill, index) => (
        <Card key={index} className="transition-all duration-200 hover:shadow-md">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-xl">{skill.skill}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {skill.difficulty} difficulty
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {skill.timeToMaster}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={skill.gap <= 20 ? "default" : skill.gap <= 50 ? "secondary" : "destructive"}
                    className="text-sm px-3 py-1"
                  >
                    {skill.gap}% gap
                  </Badge>
                  <div className="text-sm text-ai-success font-medium mt-1">
                    {skill.salaryImpact} salary boost
                  </div>
                </div>
              </div>

              {/* Market Stats */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-muted/20 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-ai-primary">{skill.jobCount}</div>
                  <div className="text-xs text-muted-foreground">Job Openings</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-ai-secondary">{skill.demand}%</div>
                  <div className="text-xs text-muted-foreground">Market Demand</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-ai-accent">{skill.salaryImpact}</div>
                  <div className="text-xs text-muted-foreground">Salary Impact</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Market Demand</span>
                      <span className="text-red-600">{skill.demand}%</span>
                    </div>
                    <Progress value={skill.demand} className="h-3 bg-red-100" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Your Current Level</span>
                      <span className="text-ai-primary">{skill.learnerLevel}%</span>
                    </div>
                    <Progress value={skill.learnerLevel} className="h-3" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Gap Analysis</span>
                    <span className="text-red-600">{skill.gap}%</span>
                  </div>
                  <Progress value={skill.gap} className="h-3 bg-red-100" />
                </div>
              </div>

              {skill.gap > 20 && (
                <div className="bg-gradient-to-br from-muted/30 to-muted/10 p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-ai-primary" />
                    <span className="font-medium text-sm">Recommended Learning Path</span>
                  </div>
                  <div className="space-y-2">
                    {skill.courses.map((course, idx) => (
                      <Button key={idx} size="sm" variant="outline" className="h-8 w-full justify-start">
                        <ExternalLink className="w-3 h-3 mr-2" />
                        {course}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DetailedSkillGapAnalysis;
