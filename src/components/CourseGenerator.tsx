import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { AssessmentGenerator } from "./AssessmentGenerator";
// import { CoursePreview } from "./CoursePreview";
import { FullCourseView } from "./FullCourseView";
import { MyCoursesViewer } from "./MyCoursesViewer";
import { useCourseGenerator } from "@/contexts/CourseGeneratorContext";
import { 
  Brain, 
  Sparkles, 
  FileText, 
  Clock,
  Users,
  Target,
  CheckCircle,
  Send,
  Bot,
  User,
  Zap,
  Upload,
  Eye,
  Plus,
  BookmarkCheck,
  Loader2,
  BookOpen,
  Edit,
  Check,
  RefreshCw,
  Award
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface CourseData {
  courseTopic?: string;
  targetAudience?: string;
  difficulty?: string;
  duration?: string;
  learningObjectives?: string;
  industryContext?: string;
}

export const CourseGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [courseData, setCourseData] = useState<CourseData>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [researchProgress, setResearchProgress] = useState(0);
  const [generationPhase, setGenerationPhase] = useState("");
  const [showAssessmentGenerator, setShowAssessmentGenerator] = useState(false);
  const [showCoursePreview, setShowCoursePreview] = useState(false);
  const [showFullCourseView, setShowFullCourseView] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [courseCreated, setCourseCreated] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isGeneratingCoverImage, setIsGeneratingCoverImage] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [showMyCourses, setShowMyCourses] = useState(false);
  const [manualCourseData, setManualCourseData] = useState({
    title: '',
    description: '',
    difficulty: 'beginner',
    duration: '4-8 hours',
    targetAudience: '',
    learningObjectives: '',
    modules: [{ id: 1, title: '', lessons: [{ title: '', duration: '', type: 'video' }] }]
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { 
    messages, 
    isInitializing, 
    isLoading, 
    error, 
    isComplete,
    generatedCourse: apiGeneratedCourse,
    currentStep,
    setCurrentStep,
    addMessage, 
    sendAnswer,
    getGeneratedCourse,
    clearError
  } = useCourseGenerator();

  const questions = [
    "What topic would you like to create a course about?",
    "Who is your target audience? (e.g., beginners, intermediate professionals, advanced practitioners, executives)",
    "What difficulty level should this course be? (beginner, intermediate, advanced, expert)",
    "How long should the course be? (2-4 hours, 4-8 hours, 8-16 hours, 16+ hours)",
    "What industry context is most relevant? (e.g., Healthcare, Finance, Technology, Manufacturing)",
    "What are the main learning objectives you want to achieve?"
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if session is complete and get the generated course
  useEffect(() => {
    if (isComplete && apiGeneratedCourse === null) {
      getGeneratedCourse();
    }
  }, [isComplete, apiGeneratedCourse, getGeneratedCourse]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    addMessage({
      id: Date.now().toString(),
      text: userMessage,
      isBot: false,
      timestamp: new Date()
    });
    setInputText("");

    // Store the answer based on current question
    const newCourseData = { ...courseData };
    switch (currentQuestion) {
      case 0:
        newCourseData.courseTopic = userMessage;
        break;
      case 1:
        newCourseData.targetAudience = userMessage;
        break;
      case 2:
        newCourseData.difficulty = userMessage;
        break;
      case 3:
        newCourseData.duration = userMessage;
        break;
      case 4:
        newCourseData.industryContext = userMessage;
        break;
      case 5:
        newCourseData.learningObjectives = userMessage;
        break;
    }
    setCourseData(newCourseData);

    try {
      // Send answer to API
      await sendAnswer(userMessage);
      
      // Move to next question if not complete
      if (currentQuestion < questions.length - 1 && !isComplete) {
        const nextQuestion = currentQuestion + 1;
        setCurrentQuestion(nextQuestion);
      }
    } catch (error) {
      console.error('Error sending answer:', error);
      // Add error message
      addMessage({
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment.",
        isBot: true,
        timestamp: new Date()
      });
    }
  };

  const handleGenerateCourse = async (data: CourseData) => {
    setIsGenerating(true);
    setCurrentStep("generating");
    setResearchProgress(0);
    
    addMessage({
      id: Date.now().toString(),
      text: "🚀 Starting course generation process...",
      isBot: true,
      timestamp: new Date()
    });
    
    // Simulate advanced AI course generation with multiple phases
    const phases = [
      { name: "Analyzing requirements...", duration: 800 },
      { name: "Conducting web research...", duration: 1200 },
      { name: "Generating course structure...", duration: 1000 },
      { name: "Creating lesson outlines...", duration: 1200 },
      { name: "Developing quiz questions...", duration: 800 },
      { name: "Designing case studies...", duration: 1000 },
      { name: "Finalizing course design...", duration: 600 }
    ];
    
    let progress = 0;
    for (const phase of phases) {
      setGenerationPhase(phase.name);
      addMessage({
        id: (Date.now() + 1).toString(),
        text: `📊 ${phase.name}`,
        isBot: true,
        timestamp: new Date()
      });
      await new Promise(resolve => setTimeout(resolve, phase.duration));
      progress += 100 / phases.length;
      setResearchProgress(Math.min(progress, 100));
    }
    
    // Use API generated course if available, otherwise fallback to mock
    const courseToUse = apiGeneratedCourse || {
      title: `${data.courseTopic} Mastery Program`,
      description: `Comprehensive ${data.courseTopic?.toLowerCase()} training designed for ${data.targetAudience?.toLowerCase()} professionals`,
      researchInsights: [
        "Latest industry trends indicate 40% growth in demand",
        "Top companies prioritize practical application over theory",
        "Microlearning modules show 60% better retention rates",
        "Interactive simulations increase engagement by 85%"
      ],
      modules: [
        {
          id: 1,
          title: `Foundations of ${data.courseTopic}`,
          duration: "45 min",
          lessons: [
            { title: "Historical Context & Evolution", duration: "10 min", type: "video" },
            { title: "Core Concepts & Terminology", duration: "15 min", type: "interactive" },
            { title: "Industry Applications Overview", duration: "12 min", type: "case_study" },
            { title: "Current Market Landscape", duration: "8 min", type: "research" }
          ],
          quiz: {
            questions: 12,
            types: ["multiple_choice", "scenario_based", "drag_drop"],
            passingScore: 80
          },
          caseStudy: {
            title: "Netflix's Data-Driven Content Strategy",
            scenario: "Analyze how Netflix uses data analytics to make content decisions",
            deliverables: ["Market analysis report", "Recommendation system design"]
          }
        },
        {
          id: 2,
          title: `Core Principles & Methodologies`,
          duration: "75 min",
          lessons: [
            { title: "Fundamental Theories", duration: "20 min", type: "video" },
            { title: "Best Practices Framework", duration: "25 min", type: "interactive" },
            { title: "Common Pitfalls & Solutions", duration: "18 min", type: "case_study" },
            { title: "Hands-on Workshop", duration: "12 min", type: "simulation" }
          ],
          quiz: {
            questions: 15,
            types: ["multiple_choice", "scenario_based", "code_review"],
            passingScore: 85
          },
          caseStudy: {
            title: "Tesla's Innovation Methodology",
            scenario: "Examine Tesla's approach to rapid innovation and iteration",
            deliverables: ["Process flow diagram", "Innovation strategy presentation"]
          }
        },
        {
          id: 3,
          title: `Advanced Applications & Tools`,
          duration: "90 min",
          lessons: [
            { title: "Advanced Techniques", duration: "25 min", type: "video" },
            { title: "Tool Mastery Workshop", duration: "30 min", type: "hands_on" },
            { title: "Integration Strategies", duration: "20 min", type: "case_study" },
            { title: "Performance Optimization", duration: "15 min", type: "simulation" }
          ],
          quiz: {
            questions: 18,
            types: ["practical_exercise", "scenario_based", "peer_review"],
            passingScore: 85
          },
          caseStudy: {
            title: "Amazon's Supply Chain Optimization",
            scenario: "Design an optimized supply chain using advanced analytics",
            deliverables: ["System architecture", "Performance metrics dashboard"]
          }
        },
        {
          id: 4,
          title: `Capstone Project & Portfolio`,
          duration: "120 min",
          lessons: [
            { title: "Project Planning & Scope", duration: "20 min", type: "workshop" },
            { title: "Implementation Phase", duration: "60 min", type: "hands_on" },
            { title: "Testing & Validation", duration: "25 min", type: "simulation" },
            { title: "Presentation & Portfolio", duration: "15 min", type: "presentation" }
          ],
          quiz: {
            questions: 1,
            types: ["capstone_project"],
            passingScore: 90
          },
          caseStudy: {
            title: "Personal Industry Challenge",
            scenario: "Apply learned concepts to solve a real problem in your industry",
            deliverables: ["Complete solution design", "Implementation roadmap", "ROI analysis"]
          }
        }
      ],
      quizBank: {
        totalQuestions: 150,
        categories: ["Conceptual", "Application", "Analysis", "Synthesis"],
        adaptiveScoring: true,
        aiGenerated: true
      },
      tags: [data.courseTopic, data.targetAudience, data.difficulty, "AI-Generated", "Research-Based"],
      estimatedCompletion: "8-10 hours",
      prerequisites: ["Basic understanding of business concepts", "Familiarity with data interpretation"],
      learningOutcomes: [
        `Master fundamental concepts of ${data.courseTopic}`,
        "Apply best practices in real-world scenarios",
        "Analyze complex problems using systematic approaches",
        "Design and implement effective solutions"
      ]
    };
    
    setCurrentStep("completed");
    setIsGenerating(false);
  };

  const handleGenerateAssessments = async () => {
    setShowAssessmentGenerator(true);
  };

  const handleGenerateFullContent = async () => {
    setIsGeneratingContent(true);
    setCurrentStep("generating");
    setResearchProgress(0);
    
    addMessage({
      id: Date.now().toString(),
      text: "🚀 Starting comprehensive content generation...",
      isBot: true,
      timestamp: new Date()
    });
    
    // Enhanced AI content generation phases
    const phases = [
      { name: "Analyzing learning objectives...", duration: 1000 },
      { name: "Generating detailed lesson content...", duration: 1500 },
      { name: "Creating video scripts & storyboards...", duration: 1200 }, 
      { name: "Developing interactive simulations...", duration: 1800 },
      { name: "Building comprehensive assessments...", duration: 1400 },
      { name: "Creating downloadable resources...", duration: 1000 },
      { name: "Generating AI-powered quizzes...", duration: 1200 },
      { name: "Setting up analytics & tracking...", duration: 800 },
      { name: "Optimizing content for engagement...", duration: 600 },
      { name: "Finalizing multimedia content...", duration: 800 }
    ];
    
    let progress = 0;
    for (const phase of phases) {
      setGenerationPhase(phase.name);
      addMessage({
        id: (Date.now() + 1).toString(),
        text: `📊 ${phase.name}`,
        isBot: true,
        timestamp: new Date()
      });
      await new Promise(resolve => setTimeout(resolve, phase.duration));
      progress += 100 / phases.length;
      setResearchProgress(Math.min(progress, 100));
    }
    
    setCurrentStep("completed");
    setIsGeneratingContent(false);
  };

  const handleGenerateCoverImage = async () => {
    setIsGeneratingCoverImage(true);
    
    // Simulate AI image generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Set a mock generated image
    setCoverImage("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80");
    setIsGeneratingCoverImage(false);
  };

  const handleUploadCoverImage = () => {
    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCoverImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleCreateCourse = async () => {
    setIsCreatingCourse(true);
    setCurrentStep("generating");
    setResearchProgress(0);
    
    addMessage({
      id: Date.now().toString(),
      text: "🚀 Starting course creation and deployment process...",
      isBot: true,
      timestamp: new Date()
    });
    
    // Enhanced course creation process
    const creationSteps = [
      { name: "Setting up course infrastructure...", duration: 1000 },
      { name: "Creating learning management system entries...", duration: 1200 },
      { name: "Uploading multimedia content...", duration: 1500 },
      { name: "Configuring assessment engine...", duration: 1000 },
      { name: "Setting up student enrollment system...", duration: 800 },
      { name: "Implementing progress tracking...", duration: 1000 },
      { name: "Configuring analytics dashboard...", duration: 900 },
      { name: "Setting up automated notifications...", duration: 700 },
      { name: "Deploying interactive elements...", duration: 1100 },
      { name: "Creating course certificates...", duration: 800 },
      { name: "Setting up discussion forums...", duration: 600 },
      { name: "Configuring AI tutoring system...", duration: 900 },
      { name: "Publishing course to marketplace...", duration: 1000 }
    ];
    
    let progress = 0;
    for (const step of creationSteps) {
      setGenerationPhase(step.name);
      addMessage({
        id: (Date.now() + 1).toString(),
        text: `🔧 ${step.name}`,
        isBot: true,
        timestamp: new Date()
      });
      await new Promise(resolve => setTimeout(resolve, step.duration));
      progress += 100 / creationSteps.length;
      setResearchProgress(Math.min(progress, 100));
    }
    
    addMessage({
      id: (Date.now() + 1).toString(),
      text: "✅ Course successfully created and published! Students can now enroll and start learning.",
      isBot: true,
      timestamp: new Date()
    });
    
    setCourseCreated(true);
    setIsCreatingCourse(false);
    setCurrentStep("courseCreated");
  };

  const resetSession = () => {
    setCurrentStep("chat");
    setInputText("");
    setCurrentQuestion(0);
    setCourseData({});
    setIsGenerating(false);
    setResearchProgress(0);
    setGenerationPhase("");
    setShowAssessmentGenerator(false);
    setShowCoursePreview(false);
    setShowFullCourseView(false);
    setIsGeneratingContent(false);
    setIsCreatingCourse(false);
    setCourseCreated(false);
    setCoverImage(null);
    setIsGeneratingCoverImage(false);
    setEditingCourse(null);
    setShowMyCourses(false);
    setManualCourseData({
      title: '',
      description: '',
      difficulty: 'beginner',
      duration: '4-8 hours',
      targetAudience: '',
      learningObjectives: '',
      modules: [{ id: 1, title: '', lessons: [{ title: '', duration: '', type: 'video' }] }]
    });
    addMessage({
      id: Date.now().toString(),
      text: "🔄 Starting a new course creation session. What would you like to create?",
      isBot: true,
      timestamp: new Date()
    });
  };

  return (
    <div className="space-y-6">
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

      {currentStep === "chat" && (
        <Card className="h-[700px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-ai-primary" />
              AI Course Creator Assistant
            </CardTitle>
            <CardDescription>
              Let's create your course together through conversation
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <ScrollArea className="flex-1 px-6 max-h-[480px]">
              {isInitializing ? (
                <div className="flex justify-center items-center h-full">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 text-ai-primary animate-spin mx-auto mb-2" />
                    <p className="text-muted-foreground">Initializing your course creation session...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`flex max-w-[80%] ${
                          message.isBot ? 'flex-row' : 'flex-row-reverse'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.isBot
                              ? 'bg-ai-primary text-white mr-3'
                              : 'bg-muted text-foreground ml-3'
                          }`}
                        >
                          {message.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        <div
                          className={`px-4 py-2 rounded-lg ${
                            message.isBot
                              ? 'bg-muted text-foreground'
                              : 'bg-ai-primary text-white'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-ai-primary text-white mr-3">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-muted px-4 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your response..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading || isInitializing}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading || isInitializing}
                  className="bg-ai-primary hover:bg-ai-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === "generating" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-ai-primary animate-pulse" />
              AI Course Generation in Progress
            </CardTitle>
            <CardDescription>
              Our AI agents are analyzing your requirements and creating your course
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-ai-primary/10 rounded-full flex items-center justify-center">
                <Brain className="w-10 h-10 text-ai-primary animate-pulse" />
              </div>
              <p className="text-lg font-medium text-ai-primary">
                Creating: {courseData.courseTopic} Course
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{generationPhase}</span>
                <span className="text-sm text-muted-foreground">{Math.round(researchProgress)}%</span>
              </div>
              <Progress value={researchProgress} className="h-3" />
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === "completed" && apiGeneratedCourse && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              🎉 Course Generated Successfully!
            </h2>
            <p className="text-gray-600">
              Your personalized course is ready. Here's what we've created for you:
            </p>
          </div>

          {/* Course Overview */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {apiGeneratedCourse.course_title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {apiGeneratedCourse.course_description}
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{apiGeneratedCourse.modules.length} Modules</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Estimated 20-30 min</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Course Modules */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Course Modules</h4>
            
            {apiGeneratedCourse.modules.map((module, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-800 mb-1">
                        {module.module_name}
                      </h5>
                      <p className="text-sm text-gray-600 mb-3">
                        {module.module_description}
                      </p>
                      
                      {/* Module Content */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-700 whitespace-pre-line">
                          {module.content}
                        </div>
                      </div>

                      {/* Assessment Questions (if available) */}
                      {module.questions && module.questions.length > 0 && (
                        <div className="mt-4">
                          <h6 className="font-medium text-gray-700 mb-2 flex items-center">
                            <Award className="w-4 h-4 mr-2" />
                            Assessment Questions ({module.questions.length})
                          </h6>
                          <div className="space-y-3">
                            {module.questions.map((question, qIndex) => (
                              <div key={qIndex} className="bg-white border rounded-lg p-3">
                                <p className="font-medium text-gray-800 mb-2">
                                  {qIndex + 1}. {question.question}
                                </p>
                                <div className="space-y-2">
                                  {question.options.map((option, oIndex) => (
                                    <div key={oIndex} className="flex items-center space-x-2">
                                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                        String.fromCharCode(65 + oIndex) === question.correct_answer
                                          ? 'border-green-500 bg-green-100'
                                          : 'border-gray-300'
                                      }`}>
                                        <span className="text-xs font-medium">
                                          {String.fromCharCode(65 + oIndex)}
                                        </span>
                                      </div>
                                      <span className={`text-sm ${
                                        String.fromCharCode(65 + oIndex) === question.correct_answer
                                          ? 'text-green-700 font-medium'
                                          : 'text-gray-600'
                                      }`}>
                                        {option}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                {question.explanation && (
                                  <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-800">
                                    <strong>Explanation:</strong> {question.explanation}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => setCurrentStep("editCourse")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Course
            </Button>
            <Button
              onClick={() => setCurrentStep("courseCreated")}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="w-4 h-4 mr-2" />
              Finalize Course
            </Button>
            <Button
              onClick={resetSession}
              variant="outline"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Create New Course
            </Button>
          </div>
        </div>
      )}

      {currentStep === "editCourse" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-ai-primary" />
              Edit Course Manually
            </CardTitle>
            <CardDescription>
              Customize and modify your generated course content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Course Title</label>
                  <Input 
                    value={editingCourse?.course_title}
                    onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                    placeholder="Enter course title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    value={editingCourse?.course_description}
                    onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                    placeholder="Enter course description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Difficulty</label>
                    <select className="w-full p-2 border rounded-md" 
                      value={editingCourse?.difficulty || courseData.difficulty || 'beginner'}
                      onChange={(e) => setEditingCourse({...editingCourse, difficulty: e.target.value})}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Duration</label>
                    <select className="w-full p-2 border rounded-md"
                      value={editingCourse?.duration || courseData.duration || '4-8 hours'}
                      onChange={(e) => setEditingCourse({...editingCourse, duration: e.target.value})}
                    >
                      <option value="2-4 hours">2-4 hours</option>
                      <option value="4-8 hours">4-8 hours</option>
                      <option value="8-16 hours">8-16 hours</option>
                      <option value="16+ hours">16+ hours</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Target Audience</label>
                  <Input 
                    value={editingCourse?.targetAudience}
                    onChange={(e) => setEditingCourse({...editingCourse, targetAudience: e.target.value})}
                    placeholder="e.g., Software developers, Marketing professionals"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Learning Objectives</label>
                  <Textarea 
                    value={editingCourse?.learningObjectives}
                    onChange={(e) => setEditingCourse({...editingCourse, learningObjectives: e.target.value})}
                    placeholder="What will students learn from this course?"
                    rows={3}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Course Modules</label>
                  <ScrollArea className="h-[400px] border rounded-md p-4">
                    {(apiGeneratedCourse)?.modules?.map((module, moduleIndex: number) => (
                      <div key={module.module_name} className="mb-4 p-4 border rounded-lg">
                        <div className="mb-2">
                          <Input 
                            value={module.module_name}
                            onChange={(e) => {
                              const updatedModules = [...(apiGeneratedCourse).modules];
                              updatedModules[moduleIndex].module_name = e.target.value;
                              setEditingCourse({...editingCourse, modules: updatedModules});
                            }}
                            className="font-medium"
                          />
                        </div>
                      
                      </div>
                    ))}
                    <Button 
                      variant="outline"
                      onClick={() => {
                        const newModule = {
                          id: (apiGeneratedCourse).modules.length + 1,
                          title: 'New Module',
                          duration: '60 min',
                          lessons: [{ title: 'Introduction', duration: '10 min', type: 'video' }]
                        };
                        setEditingCourse({...editingCourse, modules: [...(apiGeneratedCourse).modules, newModule]});
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Module
                    </Button>
                  </ScrollArea>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={() => setCurrentStep("completed")}
                variant="outline"
              >
                Cancel
              </Button>
              <Button 
                onClick={async () => {
                  setIsCreatingCourse(true);
                  addMessage({
                    id: Date.now().toString(),
                    text: "📚 Saving and publishing course to My Courses...",
                    isBot: true,
                    timestamp: new Date()
                  });
                  
                  // Save course to localStorage and My Courses
                  const courseToSave = {
                    id: Date.now(),
                    title: (apiGeneratedCourse)?.course_title || "Generated Course",
                    description: (apiGeneratedCourse)?.course_description || "AI Generated Course",
                    students: 0,
                    progress: 0,
                    engagement: 0,
                    status: "draft",
                    createdAt: new Date().toISOString(),
                    modules: (apiGeneratedCourse)?.modules || []
                  };
                  
                  // Get existing courses from localStorage
                  const existingCourses = JSON.parse(localStorage.getItem('instructorCourses') || '[]');
                  const updatedCourses = [courseToSave, ...existingCourses];
                  localStorage.setItem('instructorCourses', JSON.stringify(updatedCourses));
                  
                  await new Promise(resolve => setTimeout(resolve, 2000));
                  addMessage({
                    id: (Date.now() + 1).toString(),
                    text: `✅ Course "${courseToSave.title}" successfully saved to My Courses!`,
                    isBot: true,
                    timestamp: new Date()
                  });
                  setIsCreatingCourse(false);
                }}
                variant="ai"
                disabled={isCreatingCourse}
              >
                {isCreatingCourse ? <Sparkles className="w-4 h-4 mr-2 animate-spin" /> : <BookmarkCheck className="w-4 h-4 mr-2" />}
                Save & Publish Course
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === "courseCreated" && (
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <CheckCircle className="w-5 h-5 mr-2" />
              Course Successfully Published!
            </CardTitle>
            <CardDescription className="text-green-600">
              Your course is now live and ready for students to enroll.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-green-200 rounded-lg bg-white">
                <div className="font-semibold text-2xl text-green-700">Live</div>
                <div className="text-sm text-green-600">Course Status</div>
              </div>
              <div className="text-center p-4 border border-green-200 rounded-lg bg-white">
                <div className="font-semibold text-2xl text-green-700">0</div>
                <div className="text-sm text-green-600">Students Enrolled</div>
              </div>
              <div className="text-center p-4 border border-green-200 rounded-lg bg-white">
                <div className="font-semibold text-2xl text-green-700">100%</div>
                <div className="text-sm text-green-600">Setup Complete</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What's Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📊 Monitor Performance</h4>
                  <p className="text-sm text-muted-foreground">
                    Track student enrollment, engagement, and completion rates through your instructor dashboard.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Promote Your Course</h4>
                  <p className="text-sm text-muted-foreground">
                    Share your course with your network and leverage our marketing tools to reach more students.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">💬 Engage Students</h4>
                  <p className="text-sm text-muted-foreground">
                    Use discussion forums, Q&A sessions, and feedback tools to create an interactive learning experience.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📈 Optimize Content</h4>
                  <p className="text-sm text-muted-foreground">
                    Review analytics data and student feedback to continuously improve your course content.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={() => window.open('/instructor', '_blank')} className="bg-ai-primary hover:bg-ai-primary/90">
                Go to Dashboard
              </Button>
              <Button onClick={() => setCurrentStep("chat")} variant="outline">
                Create Another Course
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showAssessmentGenerator && (
        <AssessmentGenerator 
          onClose={() => setShowAssessmentGenerator(false)}
        />
      )}

      {/* {showCoursePreview && (apiGeneratedCourse) && (
        <CoursePreview 
          course={apiGeneratedCourse} 
          onClose={() => setShowCoursePreview(false)}
        />
      )} */}

      {showAssessmentGenerator && (
        <AssessmentGenerator 
          onClose={() => setShowAssessmentGenerator(false)}
        />
      )}

      {showFullCourseView && (apiGeneratedCourse) && (
        <FullCourseView
          course={apiGeneratedCourse}
          onClose={() => setShowFullCourseView(false)}
        />
      )}

      {showMyCourses && (
        <MyCoursesViewer
          onClose={() => setShowMyCourses(false)}
        />
      )}
    </div>
  );
};