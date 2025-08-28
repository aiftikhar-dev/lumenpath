import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Star } from "lucide-react";

import { PastInterview } from "@/types/student/mock-interview";

interface InterviewHistoryCardProps {
  interview: PastInterview;
}

const InterviewHistoryCard = ({ interview }: InterviewHistoryCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{interview.type}</h3>
              <Badge variant="outline">{interview.company}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {new Date(interview.date).toLocaleDateString()} • {interview.duration}
            </p>
            <p className="text-sm">{interview.feedback}</p>
          </div>
          
          <div className="text-right space-y-2">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-bold">{interview.score}%</span>
            </div>
            <Button size="sm" variant="outline">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewHistoryCard;
