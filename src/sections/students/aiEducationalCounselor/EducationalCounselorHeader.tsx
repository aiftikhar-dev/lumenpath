import { GraduationCap } from "lucide-react";

const EducationalCounselorHeader = () => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 bg-ai-secondary/10 rounded-full flex items-center justify-center">
        <GraduationCap className="w-6 h-6 text-ai-secondary" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">AI Educational Counselor</h2>
        <p className="text-muted-foreground">Personalized study paths based on your interests</p>
      </div>
    </div>
  );
};

export default EducationalCounselorHeader;
