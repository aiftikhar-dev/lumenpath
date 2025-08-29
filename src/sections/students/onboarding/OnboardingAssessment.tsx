import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useOnboarding } from "@/contexts/StudentOnboardingContext";

function OnboardingAssessment() {
    const { data, updateData } = useOnboarding();
  return (
    <div>
      {" "}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Tell us more about your specific goals
        </h3>
        <div className="space-y-2">
          <Label htmlFor="goal">
            What do you want to achieve? (e.g., "Build recommendation systems",
            "Lead AI teams")
          </Label>
          <Textarea
            id="goal"
            placeholder="Describe your learning objectives and career aspirations..."
            value={data.goal || ""}
            onChange={(e) => updateData({ ...data, goal: e.target.value })}
            className="min-h-[120px]"
          />
        </div>
      </div>
    </div>
  );
}

export default OnboardingAssessment;
