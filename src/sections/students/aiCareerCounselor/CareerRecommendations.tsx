import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Target, TrendingUp } from "lucide-react";
import { CareerPath } from "@/types/student/ai-career-counselor";

interface CareerRecommendationsProps {
  careerPaths: CareerPath[];
}

const CareerRecommendations = ({ careerPaths }: CareerRecommendationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-ai-secondary" />
          Top Career Matches
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {careerPaths.map((path, index) => (
          <div key={index} className="p-3 border rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-sm">{path.title}</h4>
              <span className="text-xs bg-ai-success/10 text-ai-success px-2 py-1 rounded">
                {path.match}
              </span>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {path.growth}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {path.salary}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CareerRecommendations;
