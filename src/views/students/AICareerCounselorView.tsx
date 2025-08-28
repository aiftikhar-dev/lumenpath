import QuickStats from "@/components/QuickStats";
import WelcomeBanner from "@/components/WelcomeBanner";
import AICounselor from "@/sections/students/aiCareerCounselor/AICounselor";
import { useState } from "react";

const AICareerCounselorView = () => {
  const [careerStats] = useState({
    careerGoals: 3,
    completedSessions: 8,
    insightsGenerated: 15,
    actionItems: 12
  });

  const [conversationHistory, setConversationHistory] = useState<Array<{
    id: number;
    type: "ai" | "user";
    message: string;
    timestamp: string;
  }>>([
    {
      id: 1,
      type: "ai",
      message: "Hello! I'm your AI Career Counselor. How can I help you today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const [currentQuestion, setCurrentQuestion] = useState("");

  const handleSendQuestion = () => {
    if (!currentQuestion.trim()) return;
    // Add user question to conversation
    const userMessage = {
      id: conversationHistory.length + 1,
      type: "user" as const,
      message: currentQuestion,
      timestamp: new Date().toLocaleTimeString()
    };
    setConversationHistory(prev => [...prev, userMessage]);
    setCurrentQuestion("");
  };

  return (
    <div className="space-y-6">
        <WelcomeBanner
        userName="Ahmad"
        currentGoal="AI Researcher"
        overallProgress={34}
      />

      <QuickStats
        variant="dashboard"
        data={{
          activeCourses: careerStats.careerGoals,
          studyBuddies: careerStats.completedSessions,
          achievements: careerStats.insightsGenerated,
          learningStreak: careerStats.actionItems
        }}
      />
      
        <AICounselor />
  
      

    </div>
  );
};

export default AICareerCounselorView;
