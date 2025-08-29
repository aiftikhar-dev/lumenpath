import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/contexts/StudentOnboardingContext";

function OnboardingProfile() {
  const skills = [
    "Python",
    "JavaScript",
    "R",
    "SQL",
    "Java",
    "C++",
    "Machine Learning",
    "Deep Learning",
    "Data Analysis",
    "Statistics",
    "Cloud Computing",
    "Docker",
    "Kubernetes",
    "Git",
    "TensorFlow",
    "PyTorch",
    "Pandas",
    "NumPy",
    "Scikit-learn",
  ];

  const { data,toggleSkill } = useOnboarding();
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Which tools or topics are you already comfortable with?
      </h3>
      <p className="text-sm text-muted-foreground">
        Select all that apply. This helps us skip basics you already know.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {skills.map((skill) => (
          <div key={skill} className="flex items-center space-x-2">
            <Checkbox
              id={skill}
              checked={data.experience?.includes(skill) || false}
              onCheckedChange={() => toggleSkill(skill)}
            />
            <Label htmlFor={skill} className="text-sm cursor-pointer">
              {skill}
            </Label>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium">
          Selected: {data.experience?.length || 0} skills
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {data.experience?.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OnboardingProfile;
