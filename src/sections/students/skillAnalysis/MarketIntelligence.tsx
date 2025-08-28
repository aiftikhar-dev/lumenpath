import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, Lightbulb } from "lucide-react";
import { MarketDemand } from "@/types/student/skill-gap-analysis";

interface MarketIntelligenceProps {
  currentDomain: MarketDemand | undefined;
}

const MarketIntelligence = ({ currentDomain }: MarketIntelligenceProps) => {
  if (!currentDomain) return null;

  const highImpactSkills = currentDomain.inDemandSkills
    .sort((a, b) => parseFloat(b.salaryImpact.replace('%', '').replace('+', '')) - parseFloat(a.salaryImpact.replace('%', '').replace('+', '')))
    .slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-ai-primary" />
          UAE Market Intelligence
        </CardTitle>
        <CardDescription>Real-time market insights for {currentDomain.domain}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Market Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gradient-to-br from-ai-primary/10 to-ai-primary/5 rounded-lg border">
            <div className="text-lg font-bold text-ai-primary">{currentDomain.marketValue}</div>
            <div className="text-xs text-muted-foreground">Market Size</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-ai-success/10 to-ai-success/5 rounded-lg border">
            <div className="text-lg font-bold text-ai-success">{currentDomain.jobOpenings}</div>
            <div className="text-xs text-muted-foreground">Open Positions</div>
          </div>
        </div>

        <div className="text-center p-3 bg-gradient-to-br from-ai-accent/10 to-ai-accent/5 rounded-lg border">
          <div className="text-lg font-bold text-ai-accent">{currentDomain.avgSalary}</div>
          <div className="text-xs text-muted-foreground">Average Salary</div>
        </div>
        
        {/* Top Companies */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-ai-secondary" />
            Top Hiring Companies
          </h4>
          <div className="flex flex-wrap gap-2">
            {currentDomain.topCompanies.map((company, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-ai-secondary/10 text-ai-secondary border-ai-secondary/30">
                {company}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* High-Impact Skills */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            High-Impact Skills
          </h4>
          <div className="space-y-2">
            {highImpactSkills.map((skill, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                <span className="text-sm font-medium">{skill.skill}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                    {skill.salaryImpact} salary
                  </Badge>
                  <span className="text-xs text-muted-foreground">{skill.jobCount} jobs</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketIntelligence;
