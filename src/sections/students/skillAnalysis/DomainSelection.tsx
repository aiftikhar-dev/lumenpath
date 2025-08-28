import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MarketDemand } from "@/types/student/skill-gap-analysis";

interface DomainSelectionProps {
  marketDemands: MarketDemand[];
  selectedDomain: string;
  onDomainChange: (domain: string) => void;
}

const DomainSelection = ({ marketDemands, selectedDomain, onDomainChange }: DomainSelectionProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {marketDemands.map((domain) => (
        <Button
          key={domain.domain}
          variant={selectedDomain === domain.domain ? "default" : "outline"}
          onClick={() => onDomainChange(domain.domain)}
          className="relative flex items-center gap-2 px-6 py-3 transition-all duration-300 hover:scale-105"
          style={selectedDomain === domain.domain ? { background: "hsl(217, 91%, 60%)" } : {}}
        >
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: domain.color }}
          />
          {domain.domain}
          <Badge 
            variant="secondary" 
            className="text-xs bg-white/20 text-current border-white/30"
          >
            {domain.growth}
          </Badge>
        </Button>
      ))}
    </div>
  );
};

export default DomainSelection;
