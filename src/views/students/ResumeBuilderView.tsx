import QuickActions from "@/components/QuickActions";
import QuickStats from "@/components/QuickStats";
import ResumeBuilder from "@/components/ResumeBuilder";
import WelcomeBanner from "@/components/WelcomeBanner";

import { useState } from "react";

const ResumeBuilderView = () => {
  const [resumeStats] = useState({
    totalResumes: 3,
    activeResume: 1,
    aiOptimizations: 8,
    downloadCount: 12,
  });

  return (
    <div className="space-y-6">
      <WelcomeBanner
        userName="Ahmad"
        currentGoal="AI Researcher"
        overallProgress={34}
      />
      <QuickActions currentCourses={undefined} setActiveCourse={undefined}/>

      <QuickStats
        variant="resume-builder"
        data={{
          totalResumes: resumeStats.totalResumes,
          activeResume: resumeStats.activeResume,
          aiOptimizations: resumeStats.aiOptimizations,
          downloadCount: resumeStats.downloadCount,
        }}
      />
      <ResumeBuilder />
    </div>
  );
};

export default ResumeBuilderView;
