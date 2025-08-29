import { StudentAIAssistant } from "@/components/StudentAIAssistant";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { StudentSidebar } from "./sidebar";

interface StudentLayoutProps {
  children: ReactNode;
}
const tabs = {
  dashboard: "Dashboard",
  "adaptive-learning": "Adaptive Learning",
  "study-buddies": "Study Buddies",
  "skill-analysis": "Skill Analysis",
  "market-skills": "Market Skills",
  "ai-career-counselor": "AI Career Counselor",
  "ai-educational-counselor": "AI Educational Counselor",
  "mock-interviews": "Mock Interviews",
  "job-recommendations": "Job Recommendations",
  profile: "Profile",
  "resume-builder": "Resume Builder",
  "mock-assessments": "Mock Assessments",
};
export const StudentLayout = ({ children }: StudentLayoutProps) => {
  const { activeTab } = useSidebar();
  return (
    <div className="min-h-screen flex w-full bg-background">
      <StudentSidebar onShowOnboarding={() => {}} />
      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center border-b px-6">
          <SidebarTrigger />
          <h1 className="ml-4 text-xl font-semibold">{tabs[activeTab]}</h1>
        </header>
        <main className="flex-1 p-6">{children}</main>

        {/* AI Assistant */}
        <StudentAIAssistant />
      </div>
    </div>
  );
};
