import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useOnboarding } from "@/contexts/StudentOnboardingContext";

function Completion() {
  const { data, updateData } = useOnboarding();
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Tell us about your background</h3>
        <div className="space-y-2">
          <Label htmlFor="background">
            What's your current experience level and background?
          </Label>
          <Textarea
            id="background"
            placeholder="e.g., 'I'm a software engineer with 3 years experience, new to AI but familiar with Python...'"
            value={data.background || ""}
            onChange={(e) =>
              updateData({ ...data, background: e.target.value })
            }
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Preferred learning pace</h3>
        <RadioGroup
          value={data.preferredPace || ""}
          onValueChange={(value) =>
            updateData({ ...data, preferredPace: value })
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="intensive" id="intensive" />
            <Label htmlFor="intensive">Intensive (2-3 hours/day)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="moderate" id="moderate" />
            <Label htmlFor="moderate">Moderate (1 hour/day)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="casual" id="casual" />
            <Label htmlFor="casual">Casual (3-4 hours/week)</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default Completion;
