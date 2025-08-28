import { useState } from "react";
import { useCareerCounselor } from "@/contexts/CareerCounselorContext";
import { Message } from "@/types/student/ai-career-counselor";
import { careerPaths, skills, quickQuestions } from "@/mock-data/student/ai-career-counselor";
import CareerCounselorHeader from "./CareerCounselorHeader";
import ErrorDisplay from "./ErrorDisplay";
import ChatInterface from "./ChatInterface";
import CareerRecommendations from "./CareerRecommendations";
import SkillAssessment from "./SkillAssessment";

const AICareerCounselorMain = () => {
  const [input, setInput] = useState('');
  const { 
    messages, 
    isInitializing, 
    isLoading, 
    error, 
    addMessage, 
    sendMessage,
    clearError
  } = useCareerCounselor();

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    addMessage(userMessage);
    const userInput = input;
    setInput('');

    // Send message to API
    await sendMessage(userInput);
  };

  const handleQuickQuestion = async (question: string) => {
    if (isLoading || isInitializing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
      timestamp: new Date()
    };

    addMessage(userMessage);

    // Send question to API
    await sendMessage(question);
  };

  return (
    <div className="space-y-6">
      <CareerCounselorHeader />
      
      <ErrorDisplay error={error} clearError={clearError} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <ChatInterface
            messages={messages}
            isInitializing={isInitializing}
            isLoading={isLoading}
            input={input}
            setInput={setInput}
            onSend={handleSend}
            onQuickQuestion={handleQuickQuestion}
            quickQuestions={quickQuestions}
          />
        </div>

        {/* Career Recommendations */}
        <div className="space-y-6">
          <CareerRecommendations careerPaths={careerPaths} />
          <SkillAssessment skills={skills} />
        </div>
      </div>
    </div>
  );
};

export default AICareerCounselorMain;
