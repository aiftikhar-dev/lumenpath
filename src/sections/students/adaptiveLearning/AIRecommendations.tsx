import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Zap, Lightbulb } from "lucide-react";

interface AIRecommendation {
  icon: React.ReactNode;
  title: string;
  description: string;
  badgeText: string;
  badgeVariant: "secondary" | "outline";
  bgColor: string;
  iconColor: string;
}

interface AIRecommendationsProps {
  recommendations?: AIRecommendation[];
}

const AIRecommendations = ({ recommendations }: AIRecommendationsProps) => {
  const defaultRecommendations: AIRecommendation[] = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Focus on Linear Algebra",
      description: "Your weakest area",
      badgeText: "Priority",
      badgeVariant: "secondary",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Study in 45-min sessions",
      description: "Optimal for retention",
      badgeText: "Timing",
      badgeVariant: "outline",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Practice with real datasets",
      description: "Hands-on learning",
      badgeText: "Method",
      badgeVariant: "outline",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    }
  ];

  const displayRecommendations = recommendations || defaultRecommendations;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-ai-primary" />
          AI Recommendations
        </CardTitle>
        <CardDescription>
          Personalized suggestions based on your learning patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {displayRecommendations.map((recommendation, index) => (
            <div key={index} className={`flex items-center justify-between p-3 ${recommendation.bgColor} rounded-lg`}>
              <div className="flex items-center space-x-3">
                <div className={recommendation.iconColor}>
                  {recommendation.icon}
                </div>
                <div>
                  <p className="font-medium">{recommendation.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {recommendation.description}
                  </p>
                </div>
              </div>
              <Badge variant={recommendation.badgeVariant}>{recommendation.badgeText}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
