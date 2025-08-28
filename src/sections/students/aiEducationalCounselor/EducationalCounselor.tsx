import { AIEducationalCounselor as AIEducationalCounselorComponent } from "@/components/AIEducationalCounselor";
import { EducationalCounselorProvider } from "@/contexts/EducationalCounselorContext";

const EducationalCounselor = () => {
  return (
    <EducationalCounselorProvider>
      <AIEducationalCounselorComponent />
    </EducationalCounselorProvider>
  );
};

export default EducationalCounselor;
