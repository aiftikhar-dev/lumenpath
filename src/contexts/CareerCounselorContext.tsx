import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface SessionResponse {
  session_id: string;
  message: string;
}

interface ChatResponse {
    message: string;
}

interface CareerCounselorContextType {
  messages: Message[];
  sessionId: string | null;
  isInitializing: boolean;
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Message) => void;
  sendMessage: (userMessage: string) => Promise<void>;
  resetSession: () => void;
  clearError: () => void;
}

const API_BASE_URL = 'http://4.161.43.78/career-counselor';

const CareerCounselorContext = createContext<CareerCounselorContextType | undefined>(undefined);

export const useCareerCounselor = () => {
  const context = useContext(CareerCounselorContext);
  if (!context) {
    throw new Error('useCareerCounselor must be used within a CareerCounselorProvider');
  }
  return context;
};

interface CareerCounselorProviderProps {
  children: ReactNode;
}

 const CareerCounselorProvider: React.FC<CareerCounselorProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeSession = useCallback(async () => {
    try {
        if(sessionId) return;
      setIsInitializing(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/sessions/default`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      const data: SessionResponse = await response.json();
      setSessionId(data.session_id);
      
      // Add the first question as a welcome message
      const welcomeMessage: Message = {
        id: '1',
        type: 'ai',
        content: data.message,
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
      console.log('Session initialized successfully with first question:', data.message);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to initialize session';
      setError(errorMessage);
      console.error('Error initializing session:', error);
      
      // Fallback welcome message if API fails
      const fallbackMessage: Message = {
        id: '1',
        type: 'ai',
        content: "Hello! I'm your AI Career Counselor. I analyze your skills, personality, and career goals to recommend the perfect career path. Let's start by understanding your current situation. What's your current profession or area of study?",
        timestamp: new Date()
      };
      setMessages([fallbackMessage]);
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const sendChatMessage = useCallback(async (userMessage: string): Promise<string> => {
    if (!sessionId) {
      throw new Error('No session ID available');
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: userMessage
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data: ChatResponse = await response.json();
      return data.message;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
      setError(errorMessage);
      console.error('Error sending message:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const sendMessage = useCallback(async (userMessage: string) => {
    try {
      console.log('Sending message to API:', userMessage);
      const aiResponse = await sendChatMessage(userMessage);
      console.log('Received AI response:', aiResponse);
      
      // Add AI response to messages
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback response if API fails
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
    }
  }, [sendChatMessage]);

  const resetSession = useCallback(() => {
    
    setSessionId(null);
    setMessages([]);
    setError(null);
    setIsInitializing(true);
    setIsLoading(false);
    // Re-initialize the session
    initializeSession();
  }, [initializeSession]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initialize session only once when the provider mounts
  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  const value: CareerCounselorContextType = {
    messages,
    sessionId,
    isInitializing,
    isLoading,
    error,
    addMessage,
    sendMessage,
    resetSession,
    clearError,
  };

  return (
    <CareerCounselorContext.Provider value={value}>
      {children}
    </CareerCounselorContext.Provider>
  );
};

export default CareerCounselorProvider;
