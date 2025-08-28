import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LearningPreference } from "@/types/student/ai-educational-counselor";

interface LearningPreferencesProps {
  preferences: LearningPreference[];
}

const LearningPreferences = ({ preferences }: LearningPreferencesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Learning Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {preferences.map((pref, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{pref.icon}</span>
              <span className="text-sm">{pref.type}</span>
            </div>
            <span className="text-xs text-ai-success">{pref.compatibility}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LearningPreferences;
