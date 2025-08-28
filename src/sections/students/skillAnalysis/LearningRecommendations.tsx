import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, AlertCircle, TrendingUp, BookOpen } from "lucide-react";
import { InDemandSkill } from "@/types/student/skill-gap-analysis";

interface LearningRecommendationsProps {
  criticalGaps: InDemandSkill[];
  improvementSkills: InDemandSkill[];
}

const LearningRecommendations = ({ criticalGaps, improvementSkills }: LearningRecommendationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Personalized Learning Recommendations
        </CardTitle>
        <CardDescription>
          Curated courses from top platforms to bridge your skill gaps
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {criticalGaps.length > 0 && (
          <div>
            <h3 className="font-semibold text-red-700 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Priority Skills (Critical Gaps)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {criticalGaps.slice(0, 4).map((skill, index) => (
                <Card key={index} className="border-red-200 bg-red-50/30">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">{skill.skill}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {skill.gap}% gap to market standard
                    </p>
                    <div className="space-y-2">
                      {skill.courses.map((course, idx) => (
                        <Button key={idx} size="sm" variant="outline" className="w-full h-8 justify-start">
                          <ExternalLink className="w-3 h-3 mr-2" />
                          {course}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {improvementSkills.length > 0 && (
          <div>
            <h3 className="font-semibold text-yellow-700 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Enhancement Opportunities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {improvementSkills.map((skill, index) => (
                <Card key={index} className="border-yellow-200 bg-yellow-50/30">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">{skill.skill}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {skill.gap}% gap to market standard
                    </p>
                    <div className="space-y-2">
                      {skill.courses.slice(0, 1).map((course, idx) => (
                        <Button key={idx} size="sm" variant="outline" className="w-full h-8 justify-start">
                          <ExternalLink className="w-3 h-3 mr-2" />
                          {course}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LearningRecommendations;
