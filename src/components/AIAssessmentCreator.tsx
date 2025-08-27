import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAssessment } from "@/contexts/AssessmentContext";
import {
  Award,
  Bot,
  Brain,
  CheckCircle,
  Clock,
  Eye,
  FileCheck,
  FileText,
  HelpCircle,
  Loader2,
  PenTool,
  Plus,
  Save,
  Send,
  Sparkles,
  Target,
  User,
  Users,
  Wand2
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const AIAssessmentCreator = () => {
  const { 
    currentSession, 
    isSessionActive, 
    isLoading,
    isGeneratingAssessment,
    sessionFormData,
    setSessionFormData,
    messages,
    showSessionForm,
    setShowSessionForm,
    showAssessment,
    setShowAssessment,
    activeView,
    setActiveView,
    savedAssessments,
    resetSession,
    handleCreateSession,
    handleSendMessage,
    saveAssessment
  } = useAssessment();

  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Show session form when component mounts
  useEffect(() => {
    setShowSessionForm(true);
  }, [setShowSessionForm]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputText.trim()) {
        handleSendMessage(inputText);
        setInputText("");
      }
    }
  };

  // Session Creation Form
  if (showSessionForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <Brain className="w-6 h-6 mr-2 text-ai-primary" />
              Create New Assessment Session
            </h2>
            <p className="text-muted-foreground">Configure your assessment parameters to get started</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setActiveView('my-assessments')}
          >
            <FileCheck className="w-4 h-4 mr-2" />
            My Assessments ({savedAssessments.length})
          </Button>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wand2 className="w-5 h-5 mr-2 text-ai-primary" />
              Assessment Configuration
            </CardTitle>
            <CardDescription>
              Fill in the details below to create your assessment session
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Assessment Type</label>
                <select
                  value={sessionFormData.assessment_type}
                  onChange={(e) => setSessionFormData({ ...sessionFormData, assessment_type: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Online Assessment">Online Assessment</option>
                  <option value="Quiz">Quiz</option>
                  <option value="Exam">Exam</option>
                  <option value="Practice Test">Practice Test</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty Level</label>
                <select
                  value={sessionFormData.difficulty}
                  onChange={(e) => setSessionFormData({ ...sessionFormData, difficulty: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Topic</label>
              <Input
                value={sessionFormData.topic}
                onChange={(e) => setSessionFormData({ ...sessionFormData, topic: e.target.value })}
                placeholder="e.g., Machine Learning, Data Structures, Mathematics"
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">MCQ Questions</label>
                <Input
                  type="number"
                  value={sessionFormData.mcq_count}
                  onChange={(e) => setSessionFormData({ ...sessionFormData, mcq_count: parseInt(e.target.value) || 0 })}
                  min="0"
                  max="50"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Short Answer</label>
                <Input
                  type="number"
                  value={sessionFormData.short_answer_count}
                  onChange={(e) => setSessionFormData({ ...sessionFormData, short_answer_count: parseInt(e.target.value) || 0 })}
                  min="0"
                  max="20"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">True/False</label>
                <Input
                  type="number"
                  value={sessionFormData.true_false_count}
                  onChange={(e) => setSessionFormData({ ...sessionFormData, true_false_count: parseInt(e.target.value) || 0 })}
                  min="0"
                  max="20"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setActiveView('my-assessments')}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateSession}
                disabled={!sessionFormData.topic.trim() || isLoading}
                className="bg-ai-primary hover:bg-ai-primary/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Session...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Create Session
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Assessment View
  if (showAssessment && currentSession) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={() => setShowAssessment(false)}
              className="text-ai-primary"
            >
              ← Back to Chat
            </Button>
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <FileText className="w-6 h-6 mr-2 text-ai-primary" />
                Generated Assessment
              </h2>
              <p className="text-muted-foreground">Review your AI-generated assessment</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={resetSession}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Session
            </Button>
            <Button
              onClick={saveAssessment}
              className="bg-ai-primary hover:bg-ai-primary/90"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Assessment
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{currentSession.topic} Assessment</CardTitle>
                <CardDescription className="mt-2">
                  {currentSession.assessment_type} • {currentSession.difficulty} Level
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-lg px-4 py-2">
                {currentSession.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-ai-primary" />
                <span className="font-medium">{Math.ceil(Number(currentSession.total_questions) * 2)} min</span>
              </div>
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-ai-primary" />
                <span className="font-medium">{currentSession.total_questions} Questions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-ai-primary" />
                <span className="font-medium">{Number(currentSession.total_questions) * 5} Points</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-ai-primary" />
                <span className="font-medium">{currentSession.difficulty} Level</span>
              </div>
            </div>

            <ScrollArea className="h-[600px]">
              <div className="space-y-6">
                {currentSession.questions.map((question, index) => (
                  <Card key={question.id} className="border-l-4 border-l-ai-primary">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          <span className="bg-ai-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                            {index + 1}
                          </span>
                          {question.type === 'mcq' && <HelpCircle className="w-5 h-5 mr-2" />}
                          {question.type === 'short_answer' && <PenTool className="w-5 h-5 mr-2" />}
                          {question.type === 'true_false' && <CheckCircle className="w-5 h-5 mr-2" />}
                          {question.type.replace('_', ' ').toUpperCase()} Question
                        </CardTitle>
                        <Badge variant="secondary">5 pts</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-lg">{question.question}</p>
                        
                        {question.type === 'mcq' && question.options && (
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm bg-muted text-muted-foreground">
                                  {String.fromCharCode(65 + optionIndex)}
                                </div>
                                <span>{option}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {question.type === 'true_false' && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm bg-muted text-muted-foreground">
                                T
                              </div>
                              <span>True</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm bg-muted text-muted-foreground">
                                F
                              </div>
                              <span>False</span>
                            </div>
                          </div>
                        )}
                        
                        {question.explanation && (
                          <div className="bg-blue-50 border-l-4 border-blue-200 p-3 rounded">
                            <p className="text-sm text-blue-800">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );
  }

  // My Assessments View
  if (activeView === 'my-assessments') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={() => setActiveView('create')}
              className="text-ai-primary"
            >
              ← Back to Creator
            </Button>
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <FileCheck className="w-6 h-6 mr-2 text-ai-primary" />
                My Assessments
              </h2>
              <p className="text-muted-foreground">Manage and track your created assessments</p>
            </div>
          </div>
          <Button
            onClick={() => setActiveView('create')}
            className="bg-ai-primary hover:bg-ai-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Assessment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedAssessments.map((assessment) => (
            <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{assessment.title}</span>
                  <Badge variant="outline" className="ml-2">
                    {assessment.difficulty}
                  </Badge>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {assessment.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Target className="w-3 h-3" />
                    <span>{assessment.totalPoints} pts</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{assessment.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{assessment.assignedStudents} assigned</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>{assessment.completedAttempts} completed</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Completion Rate</span>
                    <span>{assessment.assignedStudents > 0 ? Math.round((assessment.completedAttempts / assessment.assignedStudents) * 100) : 0}%</span>
                  </div>
                  {assessment.assignedStudents > 0 && (
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-ai-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(assessment.completedAttempts / assessment.assignedStudents) * 100}%` }}
                      />
                    </div>
                  )}
                </div>

                {assessment.completedAttempts > 0 && (
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Average Score</span>
                      <span className="font-semibold text-ai-primary">{assessment.avgScore}%</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Chat Interface
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Brain className="w-6 h-6 mr-2 text-ai-primary" />
            AI Assessment Creator
          </h2>
          <p className="text-muted-foreground">Chat with AI to build your assessment</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setActiveView('my-assessments')}
          >
            <FileCheck className="w-4 h-4 mr-2" />
            My Assessments ({savedAssessments.length})
          </Button>
          <Button
            variant="outline"
            onClick={resetSession}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Session
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-ai-primary" />
                AI Assessment Assistant
              </CardTitle>
              <CardDescription>
                {currentSession ? `Session: ${currentSession.topic}` : 'No active session'}
              </CardDescription>
            </CardHeader>
            
            <ScrollArea className="flex-1 p-4 max-h-[400px]">
              <div className="space-y-4 pr-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'bot' 
                        ? 'bg-ai-primary/10 text-ai-primary' 
                        : 'bg-ai-secondary/10 text-ai-secondary'
                    }`}>
                      {message.sender === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'bot'
                        ? 'bg-muted'
                        : 'bg-ai-primary text-primary-foreground'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <div className="w-8 h-8 rounded-full bg-ai-primary/10 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-ai-primary animate-pulse" />
                    </div>
                    <div className="bg-muted px-4 py-2 rounded-lg max-w-md">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 text-ai-primary animate-spin" />
                        <span className="text-sm">
                          {isGeneratingAssessment ? "Generating assessment..." : "AI is thinking..."}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message to the AI..."
                  disabled={isLoading || !isSessionActive}
                />
                <Button 
                  onClick={() => {
                    if (inputText.trim()) {
                      handleSendMessage(inputText);
                      setInputText("");
                    }
                  }}
                  disabled={!inputText.trim() || isLoading || !isSessionActive}
                  size="sm"
                  className="bg-ai-primary hover:bg-ai-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Session Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Session Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentSession ? (
                <>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-ai-primary" />
                    <span className="text-sm font-medium">Topic: {currentSession.topic}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-ai-primary" />
                    <span className="text-sm font-medium">Type: {currentSession.assessment_type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4 text-ai-primary" />
                    <span className="text-sm font-medium">Difficulty: {currentSession.difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-ai-primary" />
                    <span className="text-sm font-medium">Questions: {currentSession.total_questions}</span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No active session</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={resetSession}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Session
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setActiveView('my-assessments')}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Assessments
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};