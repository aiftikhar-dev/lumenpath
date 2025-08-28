import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, TrendingUp, AlertCircle, Award } from "lucide-react";

interface QuickStatsProps {
  strongSkills: number;
  improvementSkills: number;
  criticalGaps: number;
  totalSkills: number;
}

const QuickStats = ({ strongSkills, improvementSkills, criticalGaps, totalSkills }: QuickStatsProps) => {
  const marketReadiness = totalSkills > 0 ? Math.round(strongSkills / totalSkills * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="relative overflow-hidden border-green-200 bg-gradient-to-br from-green-50 to-green-100/50">
        <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -translate-y-10 translate-x-10" />
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700">{strongSkills}</div>
              <p className="text-sm text-green-600">Market-Ready Skills</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100/50">
        <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-full -translate-y-10 translate-x-10" />
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-700">{improvementSkills}</div>
              <p className="text-sm text-yellow-600">Need Enhancement</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-red-200 bg-gradient-to-br from-red-50 to-red-100/50">
        <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full -translate-y-10 translate-x-10" />
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-700">{criticalGaps}</div>
              <p className="text-sm text-red-600">Critical Gaps</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-ai-primary/20 bg-gradient-to-br from-ai-primary/5 to-ai-accent/5">
        <div className="absolute top-0 right-0 w-20 h-20 bg-ai-primary/10 rounded-full -translate-y-10 translate-x-10" />
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-ai-primary/20 rounded-lg">
              <Award className="w-5 h-5 text-ai-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-ai-primary">{marketReadiness}%</div>
              <p className="text-sm text-ai-primary">Market Readiness</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStats;
