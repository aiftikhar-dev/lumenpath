import { Brain } from "lucide-react";

const CareerCounselorHeader = () => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 bg-ai-primary/10 rounded-full flex items-center justify-center">
        <Brain className="w-6 h-6 text-ai-primary" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">AI Career Counselor</h2>
        <p className="text-muted-foreground">Career path recommendations based on skills & personality</p>
      </div>
    </div>
  );
};

export default CareerCounselorHeader;
