import { StudyBuddyCard } from "@/sections/students/studyBuddies/StudyBuddyCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";


interface StudyBuddy {
  id: number;
  name: string;
  course: string;
  progress: number;
  status: "online" | "offline";
  lastActive: string;
}

interface CurrentStudyBuddiesProps {
  studyBuddies: StudyBuddy[];
}

const CurrentStudyBuddies = ({ studyBuddies }: CurrentStudyBuddiesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {studyBuddies.map((buddy) => (
      <StudyBuddyCard key={buddy.id} buddy={buddy} />
    ))}
    
    <Card className="border-dashed border-2 flex items-center justify-center min-h-[200px]">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 bg-ai-secondary/10 rounded-full flex items-center justify-center mx-auto">
          <Users className="w-6 h-6 text-ai-secondary" />
        </div>
        <div>
          <h3 className="font-semibold">Find Study Partners</h3>
          <p className="text-sm text-muted-foreground">AI will match you with compatible learners</p>
        </div>
        <Button variant="outline">Get Matched</Button>
      </div>
    </Card>
  </div>
  );
};

export default CurrentStudyBuddies;
