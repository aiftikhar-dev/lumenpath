import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface SessionResponse {
  session_id: string;
  question: string;
}

interface AnswerResponse {
  question: string;
  next_question?: string;
  is_complete?: boolean;
}

interface Course {
  course_title: string;
  course_description: string;
  modules: Array<{
    module_name: string;
    module_description: string;
    content: string;
    questions?: Array<{
      question: string;
      options: string[];
      correct_answer: string;
      explanation: string;
    }>;
  }>;
}

interface CourseResponse {
  session_id: string;
  course: Course;
  filename: string;
}

interface CourseGeneratorContextType {
  messages: Message[];
  sessionId: string | null;
  isInitializing: boolean;
  isLoading: boolean;
  error: string | null;
  isComplete: boolean;
  generatedCourse: Course | null;
  currentStep: string;
  addMessage: (message: Message) => void;
  sendAnswer: (answer: string) => Promise<void>;
  getGeneratedCourse: () => Promise<void>;
  setCurrentStep: (step: string) => void;
  resetSession: () => void;
  clearError: () => void;
}

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api/courses' 
  : 'http://4.161.43.78/courses';

const CourseGeneratorContext = createContext<
  CourseGeneratorContextType | undefined
>(undefined);

export const useCourseGenerator = () => {
  const context = useContext(CourseGeneratorContext);
  if (!context) {
    throw new Error(
      "useCourseGenerator must be used within a CourseGeneratorProvider"
    );
  }
  return context;
};

interface CourseGeneratorProviderProps {
  children: ReactNode;
}

export const CourseGeneratorProvider: React.FC<
  CourseGeneratorProviderProps
> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<Course | null>(null);
  const [currentStep, setCurrentStep] = useState("chat");

  // Use refs to track state without causing re-renders
  const abortControllerRef = useRef<AbortController | null>(null);
  const hasInitializedRef = useRef(false);

  const initializeSession = useCallback(async () => {
    // Prevent multiple initializations
    if (hasInitializedRef.current || sessionId) return;

    try {
      // Abort any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      setIsInitializing(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/start-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      const data: SessionResponse = await response.json();
      setSessionId(data.session_id);

      // Add the welcome message
      const welcomeMessage: Message = {
        id: "1",
        text: data.question,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages([welcomeMessage]);
      hasInitializedRef.current = true;
      console.log(
        "Course generation session initialized successfully:",
        data.session_id
      );
    } catch (error) {
      // Don't set error if request was aborted
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      const errorMessage =
        error instanceof Error ? error.message : "Failed to initialize session";
      setError(errorMessage);
      console.error("Error initializing course generation session:", error);

      // Fallback welcome message if API fails
      const fallbackMessage: Message = {
        id: "1",
        text: "Hello! I'm your AI Course Creator Assistant. I'll help you create an amazing course by asking you a few questions. Let's start - what topic would you like to create a course about?",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages([fallbackMessage]);
    } finally {
      setIsInitializing(false);
    }
  }, [sessionId]);

  const sendAnswer = useCallback(
    async (answer: string): Promise<void> => {
      if (!sessionId) {
        throw new Error("No session ID available");
      }

      try {
        // Abort any existing request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create new abort controller
        abortControllerRef.current = new AbortController();

        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/answer-question`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: sessionId,
            answer: answer,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to send answer");
        }

        const data: AnswerResponse = await response.json();

        // Add AI response to messages
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.question,
          isBot: true,
          timestamp: new Date(),
        };

        // Check if the session is complete
        if (data.is_complete) {
          setIsComplete(true);
          setCurrentStep("completed");
          console.log("Course generation session completed");
        } else {
          setMessages((prev) => [...prev, aiMessage]);
        }
      } catch (error) {
        // Don't set error if request was aborted
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        const errorMessage =
          error instanceof Error ? error.message : "Failed to send answer";
        setError(errorMessage);
        console.error("Error sending answer:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId]
  );

  const getGeneratedCourse = useCallback(async (): Promise<void> => {
    if (!sessionId) {
      throw new Error("No session ID available");
    }

    try {
      // Abort any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/get-course/${sessionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to get generated course");
      }

      const data: CourseResponse = await response.json();

      // Update session ID if it's different (API might return a new one)
      if (data.session_id && data.session_id !== sessionId) {
        setSessionId(data.session_id);
      }

      setGeneratedCourse(data.course);
      console.log("Generated course retrieved successfully:", data.course);
    } catch (error) {
      // Don't set error if request was aborted
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to get generated course";
      setError(errorMessage);
      console.error("Error getting generated course:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const resetSession = useCallback(() => {
    // Abort any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setSessionId(null);
    setMessages([]);
    setError(null);
    setIsInitializing(false);
    setIsLoading(false);
    setIsComplete(false);
    setGeneratedCourse(null);
    setCurrentStep("chat");
    hasInitializedRef.current = false;

    // Re-initialize the session
    initializeSession();
  }, [initializeSession]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initialize session only once when the provider mounts
  useEffect(() => {
    if (!hasInitializedRef.current) {
      initializeSession();
    }

    // Cleanup function to abort requests on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []); // Empty dependency array - only run once

  // Auto-change step when completion status changes
  useEffect(() => {
    if (isComplete && currentStep === "chat") {
      setCurrentStep("completed");
    }
  }, [isComplete, currentStep]);

  const value: CourseGeneratorContextType = {
    messages,
    sessionId,
    isInitializing,
    isLoading,
    error,
    isComplete,
    generatedCourse,
    currentStep,
    addMessage,
    sendAnswer,
    getGeneratedCourse,
    setCurrentStep,
    resetSession,
    clearError,
  };

  return (
    <CourseGeneratorContext.Provider value={value}>
      {children}
    </CourseGeneratorContext.Provider>
  );
};
