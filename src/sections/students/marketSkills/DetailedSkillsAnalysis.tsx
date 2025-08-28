import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, TrendingUp, DollarSign, Target, Briefcase } from "lucide-react";
import { UserSkill } from "@/types/student/market-skill-comparison";

interface DetailedSkillsAnalysisProps {
  userSkills: UserSkill[];
  selectedRegion: string;
}

const DetailedSkillsAnalysis = ({ userSkills, selectedRegion }: DetailedSkillsAnalysisProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="w-5 h-5 text-ai-primary" />
          Comprehensive Skills Analysis - {selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {userSkills.map((skill, index) => {
            const gap = skill.marketAvg - skill.userLevel;
            const gapStatus = gap <= 5 ? 'excellent' : gap <= 15 ? 'good' : gap <= 25 ? 'moderate' : 'critical';
            
            return (
              <div key={index} className={`p-6 border-2 rounded-xl transition-all duration-300 hover:shadow-lg ${
                gapStatus === 'excellent' ? 'border-green-200 bg-green-50/30' :
                gapStatus === 'good' ? 'border-blue-200 bg-blue-50/30' :
                gapStatus === 'moderate' ? 'border-yellow-200 bg-yellow-50/30' :
                'border-red-200 bg-red-50/30'
              }`}>
                <div className="space-y-6">
                  {/* Header Section */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold">{skill.skill}</h3>
                        <Badge variant={skill.demand === "Critical" ? "destructive" : skill.demand === "High" ? "default" : "secondary"}>
                          {skill.demand}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {skill.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-green-600" />
                          Market Growth: {skill.trend}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-ai-accent" />
                          Salary Impact: {skill.salaryImpact}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        gapStatus === 'excellent' ? 'text-green-600' :
                        gapStatus === 'good' ? 'text-blue-600' :
                        gapStatus === 'moderate' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {gap > 0 ? `-${gap}%` : `+${Math.abs(gap)}%`}
                      </div>
                      <p className="text-xs text-muted-foreground">vs Market Avg</p>
                    </div>
                  </div>

                  {/* Market Intelligence */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/50 rounded-lg border">
                    <div className="text-center">
                      <div className="text-lg font-bold text-ai-primary">{skill.jobOpenings}</div>
                      <div className="text-xs text-muted-foreground">Open Positions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-ai-success">{skill.salaryImpact}</div>
                      <div className="text-xs text-muted-foreground">Salary Boost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-ai-accent">{skill.companies.length}+</div>
                      <div className="text-xs text-muted-foreground">Top Companies</div>
                    </div>
                  </div>

                  {/* Progress Comparison */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold">Your Current Level</span>
                          <span className="font-bold text-ai-primary">{skill.userLevel}%</span>
                        </div>
                        <Progress value={skill.userLevel} className="h-4 bg-gray-100" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold">Market Average</span>
                          <span className="font-bold text-ai-secondary">{skill.marketAvg}%</span>
                        </div>
                        <Progress value={skill.marketAvg} className="h-4 bg-gray-100" />
                      </div>
                    </div>

                    {/* Gap Analysis */}
                    {gap > 0 && (
                      <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-red-600" />
                          <span className="font-semibold text-red-700">Development Recommendation</span>
                        </div>
                        <p className="text-sm text-red-700">
                          Bridge the {gap}% gap to reach market standards. This could increase your salary by {skill.salaryImpact} 
                          and open access to {skill.jobOpenings} positions in UAE.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Top Hiring Companies */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-ai-secondary" />
                      Top Hiring Companies for {skill.skill}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.companies.map((company, idx) => (
                        <Badge key={idx} variant="outline" className="bg-ai-secondary/10 text-ai-secondary border-ai-secondary/30">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedSkillsAnalysis;
