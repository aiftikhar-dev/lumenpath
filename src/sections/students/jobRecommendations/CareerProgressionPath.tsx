import { Badge } from "@/components/ui/badge";
import { TrendingUp, ChevronRight } from "lucide-react";
import { CareerPath } from "@/types/student/job-recommendations";

interface CareerProgressionPathProps {
  careerPath: CareerPath;
}

const CareerProgressionPath = ({ careerPath }: CareerProgressionPathProps) => {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-ai-primary" />
        Career Progression Path
      </h4>
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {careerPath.careerProgression.map((role, index) => (
          <div key={index} className="flex items-center gap-2 whitespace-nowrap">
            <Badge variant="outline" className="px-3 py-1">
              {role}
            </Badge>
            {index < careerPath.careerProgression.length - 1 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerProgressionPath;
