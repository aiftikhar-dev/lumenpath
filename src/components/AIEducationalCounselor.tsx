import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Send, User, Bot, BookOpen, Clock, Star, Award, Loader2 } from "lucide-react";
import { useEducationalCounselor } from "@/contexts/EducationalCounselorContext";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function AIEducationalCounselor() {
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { 
    messages, 
    isInitializing, 
    isLoading, 
    error, 
    addMessage, 
    sendMessage,
    clearError
  } = useEducationalCounselor();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current && messages.length > 0) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

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

  const recommendedCourses = [
    {
      title: "Machine Learning Fundamentals",
      duration: "8 weeks",
      difficulty: "Beginner",
      rating: 4.8,
      students: "12,450",
      relevance: "98%"
    },
    {
      title: "Advanced Python Programming",
      duration: "6 weeks", 
      difficulty: "Intermediate",
      rating: 4.9,
      students: "8,920",
      relevance: "95%"
    },
    {
      title: "Data Visualization & Analytics",
      duration: "5 weeks",
      difficulty: "Beginner",
      rating: 4.7,
      students: "15,300",
      relevance: "92%"
    }
  ];

  const studyPath = [
    { phase: "Foundation", courses: 3, duration: "4-6 weeks", status: "current" },
    { phase: "Intermediate", courses: 4, duration: "8-10 weeks", status: "upcoming" },
    { phase: "Advanced", courses: 3, duration: "6-8 weeks", status: "upcoming" },
    { phase: "Specialization", courses: 2, duration: "4-6 weeks", status: "upcoming" }
  ];

  const learningPreferences = [
    { type: "Visual Learning", compatibility: "85%", icon: "👁️" },
    { type: "Hands-on Practice", compatibility: "92%", icon: "🛠️" },
    { type: "Video Content", compatibility: "78%", icon: "📺" },
    { type: "Interactive Quizzes", compatibility: "88%", icon: "🧠" }
  ];

  const quickQuestions = [
    "Create my learning roadmap",
    "What should I study first?",
    "How long will it take?",
    "Best courses for beginners"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-ai-secondary/10 rounded-full flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-ai-secondary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">AI Educational Counselor</h2>
          <p className="text-muted-foreground">Personalized study paths based on your interests</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-sm">!</span>
              </div>
              <p className="text-red-800 text-sm">
                Connection error: {error}. Please try again.
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearError}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Dismiss
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.location.reload()}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-ai-secondary" />
                Educational Counseling Session
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4 max-h-96" ref={scrollAreaRef}>
                {isInitializing ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 text-ai-secondary animate-spin mx-auto mb-2" />
                      <p className="text-muted-foreground">Initializing your educational counseling session...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <Avatar className="w-8 h-8">
                          {message.type === 'user' ? (
                            <>
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                            </>
                          ) : (
                            <AvatarFallback className="bg-ai-secondary/10">
                              <Bot className="w-4 h-4 text-ai-secondary" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className={`max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
                          <div
                            className={`p-3 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-ai-secondary text-white'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-center items-center py-4">
                        <Loader2 className="w-6 h-6 text-ai-secondary animate-spin" />
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
              
              {/* Quick Questions */}
              <div className="p-4 border-t bg-muted/30">
                <div className="flex flex-wrap gap-2 mb-3">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs"
                      disabled={isLoading || isInitializing}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about your learning path..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    disabled={isLoading || isInitializing}
                  />
                  <Button onClick={handleSend} size="sm" disabled={isLoading || isInitializing}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Study Path & Recommendations */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-ai-accent" />
                Recommended Courses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedCourses.map((course, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{course.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {course.relevance}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {course.rating}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{course.difficulty}</span>
                      <span>{course.students} students</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-ai-primary" />
                Learning Path
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {studyPath.map((phase, index) => (
                <div key={index} className={`p-3 border rounded-lg ${
                  phase.status === 'current' ? 'bg-ai-primary/5 border-ai-primary/20' : ''
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{phase.phase}</h4>
                    {phase.status === 'current' && (
                      <Badge variant="default" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>{phase.courses} courses</div>
                    <div>{phase.duration}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Learning Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {learningPreferences.map((pref, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{pref.icon}</span>
                    <span className="text-sm">{pref.type}</span>
                  </div>
                  <span className="text-xs text-ai-success">{pref.compatibility}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}