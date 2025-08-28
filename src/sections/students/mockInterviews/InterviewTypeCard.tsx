import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Play } from "lucide-react";

import { InterviewType } from "@/types/student/mock-interview";

interface InterviewTypeCardProps {
  interview: InterviewType;
  onStartInterview: (interviewId: string) => void;
}

const InterviewTypeCard = ({ interview, onStartInterview }: InterviewTypeCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {interview.title}
          <Badge 
            variant={interview.difficulty === "Advanced" ? "destructive" : "secondary"}
          >
            {interview.difficulty}
          </Badge>
        </CardTitle>
        <CardDescription>{interview.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
            Duration: {interview.duration}
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Topics Covered:</h4>
            <div className="flex flex-wrap gap-1">
              {interview.topics.map((topic, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Companies:</h4>
            <p className="text-xs text-muted-foreground">
              {interview.companies.join(", ")}
            </p>
          </div>
        </div>
        
        <Button 
          className="w-full" 
          onClick={() => onStartInterview(interview.id)}
        >
          <Play className="w-4 h-4 mr-2" />
          Start Interview
        </Button>
      </CardContent>
    </Card>
  );
};

export default InterviewTypeCard;
