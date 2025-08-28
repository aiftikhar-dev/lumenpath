import QuickStats from "@/components/QuickStats";
import WelcomeBanner from "@/components/WelcomeBanner";
import JobRecommendationsMain from "@/sections/students/jobRecommendations/JobRecommendationsMain";
import { useState } from "react";

const JobRecommendationsView = () => {
  const [jobStats] = useState({
    totalJobs: 1247,
    appliedJobs: 8,
    interviewInvites: 3,
    savedJobs: 25,
  });

  return (
    <div className="space-y-6">
      <WelcomeBanner
        userName="Ahmad"
        currentGoal="AI Researcher"
        overallProgress={34}
      />
      <QuickStats
        variant="job-recommendations"
        data={{
          totalJobs: jobStats.totalJobs,
          appliedJobs: jobStats.appliedJobs,
          interviewInvites: jobStats.interviewInvites,
          savedJobs: jobStats.savedJobs,
        }}
      />

      <JobRecommendationsMain />
    </div>
  );
};

export default JobRecommendationsView;
