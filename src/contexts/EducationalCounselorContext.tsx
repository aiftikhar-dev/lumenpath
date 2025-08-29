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

interface EducationalCounselorContextType {
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

const API_BASE_URL = 'https://ml-stag.core42.app/educational-counselor';

const EducationalCounselorContext = createContext<EducationalCounselorContextType | undefined>(undefined);

export const useEducationalCounselor = () => {
  const context = useContext(EducationalCounselorContext);
  if (!context) {
    throw new Error('useEducationalCounselor must be used within an EducationalCounselorProvider');
  }
  return context;
};

interface EducationalCounselorProviderProps {
  children: ReactNode;
}

export const EducationalCounselorProvider: React.FC<EducationalCounselorProviderProps> = ({ children }) => {
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
      console.log('Educational session initialized successfully with first question:', data.message);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to initialize session';
      setError(errorMessage);
      console.error('Error initializing educational session:', error);
      
      // Fallback welcome message if API fails
      const fallbackMessage: Message = {
        id: '1',
        type: 'ai',
        content: "Hello! I'm your AI Educational Counselor. I create personalized study paths based on your interests, learning style, and goals. What subject or field are you most interested in learning about?",
        timestamp: new Date()
      };
      setMessages([fallbackMessage]);
    } finally {
      setIsInitializing(false);
    }
  }, [sessionId]);

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
      console.error('Error sending educational message:', error);
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
      console.log('Sending educational message to API:', userMessage);
      const aiResponse = await sendChatMessage(userMessage);
      console.log('Received educational AI response:', aiResponse);
      
      // Add AI response to messages
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending educational message:', error);
      // Fallback response if API fails
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I apologize, but I'm experiencing some technical difficulties with your educational counseling session. Please try again in a moment.",
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

  const value: EducationalCounselorContextType = {
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
    <EducationalCounselorContext.Provider value={value}>
      {children}
    </EducationalCounselorContext.Provider>
  );
};
