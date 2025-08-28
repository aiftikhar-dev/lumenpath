import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ExternalLink, Lightbulb } from "lucide-react";
import { LearningResources } from "@/types/student/job-recommendations";

interface LearningResourcesCardProps {
  learningResources: LearningResources;
}

const LearningResourcesCard = ({ learningResources }: LearningResourcesCardProps) => {
  return (
    <Card className="border-ai-primary/20 bg-gradient-to-br from-ai-primary/5 to-ai-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-ai-primary" />
          Recommended Learning Resources
        </CardTitle>
        <CardDescription>
          Curated courses from top platforms to accelerate your career transition
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(learningResources).slice(0, 6).map(([skill, courses]) => (
            <Card key={skill} className="border-dashed border-ai-primary/30 hover:border-ai-primary/50 transition-colors">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-ai-primary/20 text-ai-primary hover:bg-ai-primary/20">
                    {skill}
                  </Badge>
                  <Lightbulb className="w-4 h-4 text-ai-accent" />
                </div>
                
                <div className="space-y-3">
                  {courses.map((course, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {course.platform}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{course.duration}</span>
                      </div>
                      <h5 className="font-medium text-sm">{course.course}</h5>
                      <p className="text-xs text-muted-foreground">{course.provider}</p>
                      <Button size="sm" variant="outline" className="w-full h-8">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View Course
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningResourcesCard;
