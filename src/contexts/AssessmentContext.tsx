import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AssessmentSession {
  assessment_type: string;
  topic: string;
  difficulty: string;
  short_answer_count: number;
  mcq_count: number;
  true_false_count: number;
}

interface SessionResponse {
  session_id: string;
  assessment_type: string;
  topic: string;
  difficulty: string;
  total_questions: number;
  short_answer_count: number;
  mcq_count: number;
  true_false_count: number;
  questions: Question[];
}

interface Question {
  id: string;
  type: string;
  question: string;
  answer: string;
  explanation: string;
  answer_type: string;
  options?: string[];
  correct_answer?: string;
}

interface ChatResponse {
  session_id: string;
  status: string;
  message: string;
  current_step: string;
  assessment_data?: {
    total_questions: number;
    short_answer_count: number;
    mcq_count: number;
    true_false_count: number;
    questions: Question[];
  };
}

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface SavedAssessment {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  mcqCount: number;
  shortCount: number;
  totalPoints: number;
  estimatedTime: string;
  createdAt: Date;
  assignedStudents: number;
  completedAttempts: number;
  avgScore: number;
}

interface AssessmentContextType {
  // Session management
  currentSession: SessionResponse | null;
  isSessionActive: boolean;
  
  // Form state
  sessionFormData: AssessmentSession;
  setSessionFormData: (data: AssessmentSession) => void;
  
  // Messages state
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  
  // UI state
  showSessionForm: boolean;
  setShowSessionForm: (show: boolean) => void;
  showAssessment: boolean;
  setShowAssessment: (show: boolean) => void;
  activeView: 'create' | 'my-assessments';
  setActiveView: (view: 'create' | 'my-assessments') => void;
  
  // Saved assessments
  savedAssessments: SavedAssessment[];
  setSavedAssessments: (assessments: SavedAssessment[]) => void;
  addSavedAssessment: (assessment: SavedAssessment) => void;
  
  // API functions
  createSession: (sessionData: AssessmentSession) => Promise<SessionResponse>;
  sendChatMessage: (sessionId: string, message: string) => Promise<ChatResponse>;
  getAssessment: (sessionId: string) => Promise<SessionResponse>;
  
  // State management
  setCurrentSession: (session: SessionResponse | null) => void;
  setIsSessionActive: (active: boolean) => void;
  
  // Loading states
  isLoading: boolean;
  isGeneratingAssessment: boolean;
  setIsLoading: (loading: boolean) => void;
  setIsGeneratingAssessment: (loading: boolean) => void;
  
  // Utility functions
  resetSession: () => void;
  handleCreateSession: () => Promise<void>;
  handleSendMessage: (inputText: string) => Promise<void>;
  saveAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

const BASE_URL = 'http://4.161.43.78/assessments';

export const AssessmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSession, setCurrentSession] = useState<SessionResponse | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingAssessment, setIsGeneratingAssessment] = useState(false);
  
  // Form state
  const [sessionFormData, setSessionFormData] = useState<AssessmentSession>({
    assessment_type: "Online Assessment",
    topic: "",
    difficulty: "Easy",
    short_answer_count: 5,
    mcq_count: 10,
    true_false_count: 5
  });
  
  // Messages state
  const [messages, setMessages] = useState<Message[]>([]);
  
  // UI state
  const [showSessionForm, setShowSessionForm] = useState(true);
  const [showAssessment, setShowAssessment] = useState(false);
  const [activeView, setActiveView] = useState<'create' | 'my-assessments'>('create');
  
  // Saved assessments
  const [savedAssessments, setSavedAssessments] = useState<SavedAssessment[]>([]);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const addSavedAssessment = (assessment: SavedAssessment) => {
    setSavedAssessments(prev => [assessment, ...prev]);
  };

  const createSession = async (sessionData: AssessmentSession): Promise<SessionResponse> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/create-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create session: ${response.status} ${response.statusText}`);
      }

      const data: SessionResponse = await response.json();
      
      setCurrentSession({
        ...data,
        ...sessionData
      });
      setIsSessionActive(true);
      return data;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendChatMessage = async (sessionId: string, message: string): Promise<ChatResponse> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message , session_id: sessionId}),
      });

      if (!response.ok) {
        throw new Error(`Failed to send chat message: ${response.statusText}`);
      }

      const data: ChatResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getAssessment = async (sessionId: string): Promise<SessionResponse> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/sessions/${sessionId}`);

      if (!response.ok) {
        throw new Error(`Failed to get assessment: ${response.statusText}`);
      }

      const data: SessionResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting assessment:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetSession = () => {
    setMessages([]);
    setShowSessionForm(true);
    setShowAssessment(false);
    setIsSessionActive(false);
    setCurrentSession(null);
  };

  const handleCreateSession = async () => {
    try {
       await createSession(sessionFormData);
      setShowSessionForm(false);
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: `Great! I've created an assessment session for "${sessionFormData.topic}". Let's start building your assessment together. What would you like to focus on first?`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Failed to create session:', error);
      // You could add error handling UI here
    }
  };

  const handleSendMessage = async (inputText: string) => {
    if (!inputText.trim() || !currentSession) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    addMessage(userMessage);

    try {
      // Check if user is manually requesting generation
      if (inputText.toLowerCase().trim() === 'generate') {
        setIsGeneratingAssessment(true);
        
        const generateResponse = await sendChatMessage(currentSession.session_id, "generate");
        
        setIsGeneratingAssessment(false);
        
        // Check if assessment is complete and has assessment_data
        if (generateResponse.assessment_data) {
          // Update current session with assessment data
          setCurrentSession(prev => prev ? {
            ...prev,
            questions: generateResponse.assessment_data.questions || []
          } : null);
          setShowAssessment(true);
          setIsSessionActive(false);
        } else {
          // Add generate response
          const generateBotMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: generateResponse.message || "Generating your assessment...",
            sender: 'bot',
            timestamp: new Date()
          };
          addMessage(generateBotMessage);
        }
        return;
      }

      const response = await sendChatMessage(currentSession.session_id, inputText);
      
      // Check if response message includes "generate" - auto-send generate command
      if (response.message && response.message.toLowerCase().includes('generate')) {
        // Add bot response first
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.message,
          sender: 'bot',
          timestamp: new Date()
        };
        addMessage(botMessage);
        
        // Auto-send "generate" command
        const generateMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: "generate",
          sender: 'user',
          timestamp: new Date()
        };
        addMessage(generateMessage);
        
        // Set generating assessment loading state
        setIsGeneratingAssessment(true);
        
        // Send generate command to API
        const generateResponse = await sendChatMessage(currentSession.session_id, "generate");
        
        // Clear generating assessment loading state
        setIsGeneratingAssessment(false);
        
        // Check if assessment is complete and has assessment_data
        if (generateResponse.assessment_data) {
          // Update current session with assessment data
          setCurrentSession(prev => prev ? {
            ...prev,
            questions: generateResponse.assessment_data.questions || []
          } : null);
          setShowAssessment(true);
          setIsSessionActive(false);
        } else {
          // Add generate response
          const generateBotMessage: Message = {
            id: (Date.now() + 3).toString(),
            text: generateResponse.message || "Generating your assessment...",
            sender: 'bot',
            timestamp: new Date()
          };
          addMessage(generateBotMessage);
        }
      } else {
        // Regular chat response
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.message || "I'm processing your request...",
          sender: 'bot',
          timestamp: new Date()
        };
        addMessage(botMessage);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      addMessage(errorMessage);
    }
  };

  const saveAssessment = () => {
    if (!currentSession) return;

    const newSavedAssessment: SavedAssessment = {
      id: currentSession.session_id,
      title: `${currentSession.topic} Assessment`,
      description: `${currentSession.assessment_type} on ${currentSession.topic}`,
      difficulty: currentSession.difficulty,
      mcqCount: currentSession.mcq_count,
      shortCount: currentSession.short_answer_count,
      totalPoints: currentSession.total_questions * 5, // Assuming 5 points per question
      estimatedTime: `${Math.ceil(currentSession.total_questions * 2)} minutes`,
      createdAt: new Date(),
      assignedStudents: 0,
      completedAttempts: 0,
      avgScore: 0
    };

    addSavedAssessment(newSavedAssessment);
    setShowAssessment(false);
    setActiveView('my-assessments');
  };

  const value: AssessmentContextType = {
    currentSession,
    isSessionActive,
    sessionFormData,
    setSessionFormData,
    messages,
    setMessages,
    addMessage,
    showSessionForm,
    setShowSessionForm,
    showAssessment,
    setShowAssessment,
    activeView,
    setActiveView,
    savedAssessments,
    setSavedAssessments,
    addSavedAssessment,
    createSession,
    sendChatMessage,
    getAssessment,
    setCurrentSession,
    setIsSessionActive,
    isLoading,
    setIsLoading,
    isGeneratingAssessment,
    setIsGeneratingAssessment,
    resetSession,
    handleCreateSession,
    handleSendMessage,
    saveAssessment,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = (): AssessmentContextType => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};
