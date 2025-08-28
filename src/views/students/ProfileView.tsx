import LearnerProfile from "@/components/LearnerProfile";
import QuickActions from "@/components/QuickActions";
import QuickStats from "@/components/QuickStats";
import WelcomeBanner from "@/components/WelcomeBanner";
import { useState } from "react";

const ProfileView = () => {
  const [profileStats] = useState({
    profileCompletion: 87,
    skillsVerified: 12,
    certificatesEarned: 8,
    learningStreak: 15,
  });

  return (
    <div className="space-y-6">
      <WelcomeBanner
        userName="Ahmad"
        currentGoal="AI Researcher"
        overallProgress={34}
      />
      <QuickStats
        variant="profile"
        data={{
          profileCompletion: profileStats.profileCompletion,
          skillsVerified: profileStats.skillsVerified,
          certificatesEarned: profileStats.certificatesEarned,
          learningStreak: profileStats.learningStreak,
        }}
      />
      <QuickActions currentCourses={undefined} setActiveCourse={undefined}/>
     

      <LearnerProfile onSave={function (profileData): void {
        throw new Error("Function not implemented.");
      } }/>
    </div>
  );
};

export default ProfileView;
