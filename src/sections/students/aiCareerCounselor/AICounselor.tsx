import { AICareerCounselor as AICareerCounselorComponent } from "@/components/AICareerCounselor";
import { CareerCounselorProvider } from "@/contexts/CareerCounselorContext";

const AICounselor = () => {
  return (
    <CareerCounselorProvider>
      <AICareerCounselorComponent />
    </CareerCounselorProvider>
  );
};

export default AICounselor;
