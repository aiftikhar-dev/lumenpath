import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

function OnboardingConfirmaiton() {
    const navigate = useNavigate();

    const handleSkip = () => {
        navigate("/student/dashboard");
    }
    
    const handleUpdate = () => {
        navigate("/student/onboarding");
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg border">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-ai-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Brain className="w-8 h-8 text-ai-primary" />
          </div>
          <h2 className="text-xl font-bold">AI Career Path</h2>
          <p className="text-muted-foreground">
            Would you like to update your career path and learning preferences?
          </p>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1"
            >
              Skip for Now
            </Button>
            <Button
              variant="ai"
              onClick={handleUpdate}
              className="flex-1"
            >
              Update Path
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingConfirmaiton;
