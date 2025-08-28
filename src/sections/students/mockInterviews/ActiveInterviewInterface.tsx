import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Video } from "lucide-react";
import { useState } from "react";
import MockHeyGenAvatar from "@/components/MockHeyGenAvatar";
import LiveStatsGrid from "./LiveStatsGrid";

interface ActiveInterviewInterfaceProps {
  interviewTitle: string;
  currentQuestion: number;
  totalQuestions: number;
  currentQuestionText: string;
  timeElapsed: number;
  currentUserResponse: string;
  onAvatarSpeak: (text: string) => void;
  onUserResponse: (response: string) => void;
  onSessionReady: () => void;
  onNextQuestion: () => void;
  onPauseInterview: () => void;
  onCompleteInterview: () => void;
  avatarReady: boolean;
  isWaitingForResponse: boolean;
}

const ActiveInterviewInterface = ({
  interviewTitle,
  currentQuestion,
  totalQuestions,
  currentQuestionText,
  timeElapsed,
  currentUserResponse,
  onAvatarSpeak,
  onUserResponse,
  onSessionReady,
  onNextQuestion,
  onPauseInterview,
  onCompleteInterview,
  avatarReady,
  isWaitingForResponse
}: ActiveInterviewInterfaceProps) => {
  const [userInput, setUserInput] = useState('');

  const handleSubmitResponse = () => {
    if (userInput.trim()) {
      onUserResponse(userInput);
      setUserInput('');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-ai-primary/20 bg-gradient-to-r from-ai-primary/5 to-ai-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{interviewTitle} - In Progress</span>
            <Badge variant="secondary" className="animate-pulse">Live Session</Badge>
          </CardTitle>
          <CardDescription>
            AI-powered interview simulation with real-time feedback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* HeyGen AI Avatar Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Video */}
            <Card className="relative overflow-hidden">
              <CardContent className="p-0 aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white space-y-2">
                    <div className="w-20 h-20 mx-auto bg-gray-700 rounded-full flex items-center justify-center">
                      <Video className="w-10 h-10" />
                    </div>
                    <p className="text-sm">You</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                  <Button size="sm" variant="destructive">
                    <Mic className="w-4 h-4 mr-2" />
                    Mute
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Video className="w-4 h-4 mr-2" />
                    Camera
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Avatar */}
            <MockHeyGenAvatar
              onAvatarSpeak={onAvatarSpeak}
              onUserResponse={onUserResponse}
              onSessionReady={onSessionReady}
              currentQuestion={avatarReady ? currentQuestionText : undefined}
              isInterviewActive={true}
              className="w-full"
            />
          </div>

          {/* Current Question Display */}
          <Card className="border-ai-primary/20 bg-ai-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-lg font-medium">Question {currentQuestion + 1}:</span>
              </div>
              <p className="text-lg">{currentQuestionText}</p>
              
              {/* User Response Input */}
              <div className="mt-4 space-y-3">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your response here..."
                  className="w-full p-3 border rounded-lg resize-none"
                  rows={3}
                  disabled={!isWaitingForResponse}
                />
                <Button 
                  onClick={handleSubmitResponse}
                  disabled={!userInput.trim() || !isWaitingForResponse}
                  className="w-full"
                >
                  Submit Response
                </Button>
              </div>

              {currentUserResponse && (
                <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <p className="text-sm text-green-800">
                    <strong>Your Response:</strong> {currentUserResponse}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Live Stats */}
          <LiveStatsGrid
            timeElapsed={timeElapsed}
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
          />

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline"
              onClick={onNextQuestion}
              disabled={currentQuestion >= totalQuestions - 1}
            >
              Next Question
            </Button>
            <Button variant="outline" onClick={onPauseInterview}>
              Pause Interview
            </Button>
            <Button 
              onClick={onCompleteInterview}
              className="bg-gradient-to-r from-ai-primary to-ai-accent"
            >
              Complete Interview
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveInterviewInterface;
