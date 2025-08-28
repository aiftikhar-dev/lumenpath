import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { useInterviewState } from "./useInterviewState";
import { 
  interviewTypes, 
  pastInterviews, 
  skillMetrics, 
  interviewStats, 
  mockQuestions 
} from "@/mock-data/student/mock-interview";
import InterviewTypeCard from "./InterviewTypeCard";
import InterviewHistoryCard from "./InterviewHistoryCard";
import SkillProgressCard from "./SkillProgressCard";
import InterviewStatsCard from "./InterviewStatsCard";
import ActiveInterviewInterface from "./ActiveInterviewInterface";
import InterviewCompletionScreen from "./InterviewCompletionScreen";

const MockInterviewsMain = () => {
  const {
    activeInterview,
    interviewStarted,
    currentQuestion,
    timeElapsed,
    interviewCompleted,
    interviewScore,
    currentUserResponse,
    avatarReady,
    isWaitingForResponse,
    startInterview,
    handleAvatarSpeak,
    handleUserResponse,
    handleSessionReady,
    completeInterview,
    pauseInterview,
    nextQuestion,
    resetInterview,
    cleanup
  } = useInterviewState();

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Interview completion screen
  if (interviewCompleted && activeInterview) {
    const interview = interviewTypes.find(i => i.id === activeInterview);
    
    return (
      <InterviewCompletionScreen
        interviewScore={interviewScore}
        timeElapsed={timeElapsed}
        currentQuestion={currentQuestion}
        interviewTitle={interview?.title}
        onReturnToDashboard={resetInterview}
        onPracticeAgain={() => startInterview(activeInterview)}
      />
    );
  }

  // Active interview screen
  if (interviewStarted && activeInterview) {
    const interview = interviewTypes.find(i => i.id === activeInterview);
    const questions = mockQuestions[activeInterview as keyof typeof mockQuestions] || [];
    const currentQ = questions[currentQuestion] || "Loading next question...";

    return (
      <ActiveInterviewInterface
        interviewTitle={interview?.title || ""}
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        currentQuestionText={currentQ}
        timeElapsed={timeElapsed}
        currentUserResponse={currentUserResponse}
        onAvatarSpeak={handleAvatarSpeak}
        onUserResponse={handleUserResponse}
        onSessionReady={handleSessionReady}
        onNextQuestion={nextQuestion}
        onPauseInterview={pauseInterview}
        onCompleteInterview={completeInterview}
        avatarReady={avatarReady}
        isWaitingForResponse={isWaitingForResponse}
      />
    );
  }

  // Main dashboard
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Mock Interviews</h2>
        <p className="text-muted-foreground">
          Practice with AI-powered interview simulations
        </p>
      </div>

      <Tabs defaultValue="practice" className="space-y-6">
        <TabsList>
          <TabsTrigger value="practice">Practice Interviews</TabsTrigger>
          <TabsTrigger value="history">Interview History</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="practice" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviewTypes.map((interview) => (
              <InterviewTypeCard
                key={interview.id}
                interview={interview}
                onStartInterview={startInterview}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="space-y-4">
            {pastInterviews.map((interview) => (
              <InterviewHistoryCard key={interview.id} interview={interview} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkillProgressCard skillMetrics={skillMetrics} />
            <InterviewStatsCard stats={interviewStats} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MockInterviewsMain;
