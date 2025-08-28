import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

type Props = {
    onClickFindBuddies: () => void
}

function FindNewStudyBuddies({onClickFindBuddies}: Props) {
  return (
    <div>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Study Buddies</h2>
          <Button variant="ai" onClick={onClickFindBuddies}>
            <Users className="w-4 h-4 mr-2" />
            Find New Buddy
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FindNewStudyBuddies;
