import { useState } from "react";
import { useEducationalCounselor } from "@/contexts/EducationalCounselorContext";
import { Message } from "@/types/student/ai-educational-counselor";
import { 
  recommendedCourses, 
  studyPath, 
  learningPreferences, 
  quickQuestions 
} from "@/mock-data/student/ai-educational-counselor";
import EducationalCounselorHeader from "./EducationalCounselorHeader";
import ErrorDisplay from "./ErrorDisplay";
import ChatInterface from "./ChatInterface";
import RecommendedCourses from "./RecommendedCourses";
import LearningPath from "./LearningPath";
import LearningPreferences from "./LearningPreferences";

const AIEducationalCounselorMain = () => {
  const [input, setInput] = useState('');
  const { 
    messages, 
    isInitializing, 
    isLoading, 
    error, 
    addMessage, 
    sendMessage,
    clearError
  } = useEducationalCounselor();

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
      <EducationalCounselorHeader />
      
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

        {/* Study Path & Recommendations */}
        <div className="space-y-6">
          <RecommendedCourses courses={recommendedCourses} />
          <LearningPath studyPath={studyPath} />
          <LearningPreferences preferences={learningPreferences} />
        </div>
      </div>
    </div>
  );
};

export default AIEducationalCounselorMain;
