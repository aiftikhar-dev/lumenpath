import { useOnboarding } from "@/contexts/StudentOnboardingContext";
import { Brain, Building, Code, Search, Target } from "lucide-react";

const roles = [
  {
    id: "data-scientist",
    label: "Data Scientist",
    icon: Brain,
    description: "Build ML models and analyze data",
  },
  {
    id: "ai-researcher",
    label: "AI Researcher",
    icon: Search,
    description: "Research cutting-edge AI technologies",
  },
  {
    id: "devops-engineer",
    label: "DevOps Engineer",
    icon: Building,
    description: "Deploy and manage AI systems",
  },
  {
    id: "software-engineer",
    label: "Software Engineer",
    icon: Code,
    description: "Develop AI-powered applications",
  },
  {
    id: "product-manager",
    label: "Product Manager",
    icon: Target,
    description: "Lead AI product development",
  },
];

function LearningPath() {
  const { data, updateData } = useOnboarding();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        What's your career goal or current role?
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <div
              key={role.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                data.role === role.id
                  ? "border-ai-primary bg-ai-primary/5"
                  : "border-border"
              }`}
              onClick={() => updateData({ ...data, role: role.id })}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-ai-primary" />
                <div>
                  <h4 className="font-medium">{role.label}</h4>
                  <p className="text-sm text-muted-foreground">
                    {role.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LearningPath;
