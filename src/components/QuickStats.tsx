import { BookOpen, Users, Trophy, Calendar, Target, TrendingUp, Brain, Clock, Video, MessageSquare, Briefcase, Heart, User, Star, Award, FileText, Eye, Zap, BarChart3, Play, CheckCircle, Timer } from "lucide-react";
import StatsCard from "@/components/ui/StatsCard";

interface QuickStatsProps {
  variant?: "dashboard" | "progress" | "skills" | "market" | "adaptive" | "educational" | "mock-interviews" | "job-recommendations" | "profile" | "resume-builder" | "mock-assessments";
  data?: any;
}

const QuickStats = ({ variant = "dashboard", data = {} }: QuickStatsProps) => {
  const renderStats = () => {
    switch (variant) {
      case "dashboard":
        return (
          <>
            <StatsCard
              title="Active Courses"
              value={data.activeCourses || 0}
              description="Currently enrolled"
              icon={<BookOpen />}
            />
            <StatsCard
              title="Study Buddies"
              value={data.studyBuddies || 0}
              description="Learning partners"
              icon={<Users />}
            />
            <StatsCard
              title="Achievements"
              value={data.achievements || 0}
              description="Milestones reached"
              icon={<Trophy />}
            />
            <StatsCard
              title="Learning Streak"
              value={data.learningStreak || 0}
              description="Days in a row"
              icon={<Calendar />}
            />
          </>
        );
      case "progress":
        return (
          <>
            <StatsCard
              title="Current Goal"
              value={data.currentGoal || "Not Set"}
              description="Learning objective"
              icon={<Target />}
            />
            <StatsCard
              title="Overall Progress"
              value={`${data.overallProgress || 0}%`}
              description="Goal completion"
              icon={<TrendingUp />}
            />
            <StatsCard
              title="Target Date"
              value={data.targetDate || "Not Set"}
              description="Goal deadline"
              icon={<Calendar />}
            />
            <StatsCard
              title="Total Points"
              value={data.totalPoints || 0}
              description="Earned points"
              icon={<Trophy />}
            />
          </>
        );
      case "skills":
        return (
          <>
            <StatsCard
              title="Current Skills"
              value={data.currentSkills || 0}
              description="Skills acquired"
              icon={<Target />}
            />
            <StatsCard
              title="Target Skills"
              value={data.targetSkills || 0}
              description="Skills to learn"
              icon={<Brain />}
            />
            <StatsCard
              title="Experience Level"
              value={data.experience || "Beginner"}
              description="Current level"
              icon={<TrendingUp />}
            />
            <StatsCard
              title="Career Goal"
              value={data.goal || "Not Set"}
              description="Professional objective"
              icon={<Target />}
            />
          </>
        );
      case "market":
        return (
          <>
            <StatsCard
              title="Industry"
              value={data.industry || "Technology"}
              description="Target sector"
              icon={<TrendingUp />}
            />
            <StatsCard
              title="Region"
              value={data.region || "Global"}
              description="Geographic focus"
              icon={<Target />}
            />
            <StatsCard
              title="Total Jobs"
              value={data.totalJobs || 0}
              description="Available positions"
              icon={<Calendar />}
            />
            <StatsCard
              title="Growth Rate"
              value={data.growthRate || "0%"}
              description="Market expansion"
              icon={<TrendingUp />}
            />
            <StatsCard
              title="Timeframe"
              value={data.timeframe || "2024"}
              description="Analysis period"
              icon={<Calendar />}
            />
          </>
        );
      case "adaptive":
        return (
          <>
            <StatsCard
              title="Current Module"
              value={data.currentModule || "Not Started"}
              description="Learning progress"
              icon={<BookOpen />}
            />
            <StatsCard
              title="Overall Progress"
              value={`${data.overallProgress || 0}%`}
              description="Course completion"
              icon={<TrendingUp />}
            />
            <StatsCard
              title="Learning Efficiency"
              value={data.learningEfficiency || "Optimal"}
              description="Performance rating"
              icon={<Brain />}
            />
          </>
        );
      case "educational":
        return (
          <>
            <StatsCard
              title="Courses Completed"
              value={data.coursesCompleted || 0}
              description="Total courses finished"
              icon={<BookOpen />}
            />
            <StatsCard
              title="Average Score"
              value={`${data.averageScore || 0}%`}
              description="Across all assessments"
              icon={<TrendingUp />}
            />
            <StatsCard
              title="Total Study Hours"
              value={`${data.studyHours || 0}h`}
              description="Cumulative learning time"
              icon={<Clock />}
            />
            <StatsCard
              title="Certifications Earned"
              value={data.certifications || 0}
              description="Professional recognitions"
              icon={<Trophy />}
            />
          </>
        );
      case "mock-interviews":
        return (
          <>
            <StatsCard
              title="Completed Interviews"
              value={data.completedInterviews || 0}
              description="Total practice sessions"
              icon={<Video />}
            />
            <StatsCard
              title="Average Score"
              value={`${data.averageScore || 0}%`}
              description="Performance rating"
              icon={<TrendingUp />}
            />
            <StatsCard
              title="Total Practice Time"
              value={`${data.totalPracticeTime || 0}h`}
              description="Cumulative practice"
              icon={<Clock />}
            />
            <StatsCard
              title="Upcoming Interviews"
              value={data.upcomingInterviews || 0}
              description="Scheduled sessions"
              icon={<Calendar />}
            />
          </>
        );
      case "job-recommendations":
        return (
          <>
            <StatsCard
              title="Total Jobs"
              value={data.totalJobs || 0}
              description="Available positions"
              icon={<Briefcase />}
            />
            <StatsCard
              title="Applied Jobs"
              value={data.appliedJobs || 0}
              description="Applications submitted"
              icon={<Target />}
            />
            <StatsCard
              title="Interview Invites"
              value={data.interviewInvites || 0}
              description="Scheduled interviews"
              icon={<Calendar />}
            />
            <StatsCard
              title="Saved Jobs"
              value={data.savedJobs || 0}
              description="Bookmarked positions"
              icon={<Heart />}
            />
          </>
        );
      case "profile":
        return (
          <>
            <StatsCard
              title="Profile Completion"
              value={`${data.profileCompletion || 0}%`}
              description="Profile completeness"
              icon={<User />}
            />
            <StatsCard
              title="Skills Verified"
              value={data.skillsVerified || 0}
              description="Verified skills"
              icon={<Star />}
            />
            <StatsCard
              title="Certificates Earned"
              value={data.certificatesEarned || 0}
              description="Professional certifications"
              icon={<Award />}
            />
            <StatsCard
              title="Learning Streak"
              value={data.learningStreak || 0}
              description="Consecutive days"
              icon={<Calendar />}
            />
          </>
        );
      case "resume-builder":
        return (
          <>
            <StatsCard
              title="Total Resumes"
              value={data.totalResumes || 0}
              description="Created resumes"
              icon={<FileText />}
            />
            <StatsCard
              title="Active Resume"
              value={data.activeResume || 0}
              description="Current version"
              icon={<Eye />}
            />
            <StatsCard
              title="AI Optimizations"
              value={data.aiOptimizations || 0}
              description="Applied suggestions"
              icon={<Zap />}
            />
            <StatsCard
              title="Download Count"
              value={data.downloadCount || 0}
              description="Times downloaded"
              icon={<BarChart3 />}
            />
          </>
        );
      case "mock-assessments":
        return (
          <>
            <StatsCard
              title="Total Assessments"
              value={data.totalAssessments || 0}
              description="Available tests"
              icon={<BookOpen />}
            />
            <StatsCard
              title="Completed Assessments"
              value={data.completedAssessments || 0}
              description="Tests finished"
              icon={<CheckCircle />}
            />
            <StatsCard
              title="Average Score"
              value={`${data.averageScore || 0}%`}
              description="Performance rating"
              icon={<TrendingUp />}
            />
            <StatsCard
              title="Current Streak"
              value={data.currentStreak || 0}
              description="Consecutive days"
              icon={<Timer />}
            />
          </>
        );
      default:
        return null;
    }
  };

  const getGridCols = () => {
    switch (variant) {
      case "market": return "grid-cols-1 md:grid-cols-5";
      case "adaptive": return "grid-cols-1 md:grid-cols-3";
      case "educational": return "grid-cols-1 md:grid-cols-4";
      case "mock-interviews": return "grid-cols-1 md:grid-cols-4";
      case "job-recommendations": return "grid-cols-1 md:grid-cols-4";
      case "profile": return "grid-cols-1 md:grid-cols-4";
      case "resume-builder": return "grid-cols-1 md:grid-cols-4";
      case "mock-assessments": return "grid-cols-1 md:grid-cols-4";
      default: return "grid-cols-1 md:grid-cols-4";
    }
  };

  return (
    <div className={`grid ${getGridCols()} gap-6 mb-8`}>
      {renderStats()}
    </div>
  );
};

export default QuickStats;
