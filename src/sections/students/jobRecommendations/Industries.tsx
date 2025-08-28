import { Badge } from "@/components/ui/badge";
import { Building } from "lucide-react";
import { CareerPath } from "@/types/student/job-recommendations";

interface IndustriesProps {
  careerPath: CareerPath;
}

const Industries = ({ careerPath }: IndustriesProps) => {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold flex items-center gap-2">
        <Building className="w-4 h-4 text-ai-primary" />
        Target Industries
      </h4>
      <div className="flex flex-wrap gap-2">
        {careerPath.industries.map((industry, index) => (
          <Badge key={index} variant="secondary" className="bg-ai-primary/10 text-ai-primary">
            {industry}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default Industries;
