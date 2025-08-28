import QuickStats from "@/components/QuickStats";
import PageHeader from "@/components/ui/PageHeader";
import EducationalCounselor from "@/sections/students/aiEducationalCounselor/EducationalCounselor";
import { useState } from "react";

const AIEducationalCounselorView = () => {
  const [educationalStats] = useState({
    coursesCompleted: 12,
    averageScore: 87,
    studyHours: 156,
    certifications: 5
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Educational Counselor"
        description="Get personalized educational guidance and learning path recommendations"
      />
      
      <QuickStats
        variant="educational"
        data={{
          coursesCompleted: educationalStats.coursesCompleted,
          averageScore: educationalStats.averageScore,
          studyHours: educationalStats.studyHours,
          certifications: educationalStats.certifications
        }}
      />
      
        <EducationalCounselor />

    </div>
  );
};

export default AIEducationalCounselorView;
