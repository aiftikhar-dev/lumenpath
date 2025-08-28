import { ReactNode } from "react";
import { StudentSidebar } from "./sidebar";
import { StudentAIAssistant } from "@/components/StudentAIAssistant";

interface StudentLayoutProps {
  children: ReactNode;
  activeTab?: string;
}

export const StudentLayout = ({ children, activeTab = "dashboard" }: StudentLayoutProps) => {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <StudentSidebar activeTab={activeTab} />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          {children}
        </main>
        
        {/* AI Assistant */}
        <StudentAIAssistant />
      </div>
    </div>
  );
};
