import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, MapPin, Clock } from "lucide-react";
import { CareerPath } from "@/types/student/job-recommendations";
import SkillMatchAnalysis from "./SkillMatchAnalysis";
import CareerProgressionPath from "./CareerProgressionPath";
import Industries from "./Industries";

interface CareerPathCardProps {
  careerPath: CareerPath;
}

const CareerPathCard = ({ careerPath }: CareerPathCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-ai-primary/30">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl">{careerPath.title}</CardTitle>
              <Badge 
                variant="secondary" 
                className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300"
              >
                {careerPath.matchPercentage}% match
              </Badge>
              <Badge variant="outline" className="text-ai-primary border-ai-primary/30">
                {careerPath.growth}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-4 text-base">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {careerPath.region} Region
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {careerPath.experience} experience
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <p className="text-muted-foreground leading-relaxed">{careerPath.description}</p>
        
        {/* Skill Match Analysis */}
        <SkillMatchAnalysis careerPath={careerPath} />
        
        {/* Career Progression */}
        <CareerProgressionPath careerPath={careerPath} />
        
        {/* Industries */}
        <Industries careerPath={careerPath} />
        
        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="w-full">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Job Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerPathCard;
