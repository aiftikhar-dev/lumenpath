import { useState, useCallback, useRef } from "react";
import { mockQuestions } from "@/mock-data/student/mock-interview";

export const useInterviewState = () => {
  const [activeInterview, setActiveInterview] = useState<string | null>(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [interviewScore, setInterviewScore] = useState(0);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [currentUserResponse, setCurrentUserResponse] = useState<string>('');
  const [avatarReady, setAvatarReady] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoCompleteTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startInterview = useCallback((interviewId: string) => {
    setActiveInterview(interviewId);
    setInterviewStarted(true);
    setCurrentQuestion(0);
    setTimeElapsed(0);
    setInterviewCompleted(false);
    setInterviewScore(0);
    setUserResponses([]);
    setCurrentUserResponse('');
    setAvatarReady(false);
    setIsWaitingForResponse(false);
    
    // Start timer
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    
    // Auto-complete after 45 minutes for demo
    autoCompleteTimerRef.current = setTimeout(() => {
      completeInterview();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }, 2700000); // 45 minutes
  }, []);

  const handleAvatarSpeak = useCallback((text: string) => {
    console.log('Avatar spoke:', text);
    setIsWaitingForResponse(true);
  }, []);

  const handleUserResponse = useCallback((response: string) => {
    if (!response.trim() || !isWaitingForResponse) return;
    
    setCurrentUserResponse(response);
    setUserResponses(prev => [...prev, response]);
    setIsWaitingForResponse(false);
    
    // Auto-advance to next question after user responds
    setTimeout(() => {
      if (currentQuestion < (mockQuestions[activeInterview as keyof typeof mockQuestions]?.length || 0) - 1) {
        setCurrentQuestion(prev => prev + 1);
        setCurrentUserResponse('');
      } else {
        completeInterview();
      }
    }, 2000);
  }, [currentQuestion, activeInterview, isWaitingForResponse]);

  const handleSessionReady = useCallback(() => {
    setAvatarReady(true);
  }, []);

  const completeInterview = useCallback(() => {
    setInterviewCompleted(true);
    setInterviewScore(Math.floor(Math.random() * 30) + 70); // Random score between 70-100
    
    // Clear timers
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (autoCompleteTimerRef.current) {
      clearTimeout(autoCompleteTimerRef.current);
    }
  }, []);

  const pauseInterview = useCallback(() => {
    setInterviewStarted(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const nextQuestion = useCallback(() => {
    const questions = mockQuestions[activeInterview as keyof typeof mockQuestions] || [];
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setCurrentUserResponse('');
    }
  }, [currentQuestion, activeInterview]);

  const resetInterview = useCallback(() => {
    setInterviewCompleted(false);
    setInterviewStarted(false);
    setActiveInterview(null);
    setCurrentQuestion(0);
    setTimeElapsed(0);
    setInterviewScore(0);
    setUserResponses([]);
    setCurrentUserResponse('');
    setAvatarReady(false);
    setIsWaitingForResponse(false);
    
    // Clear timers
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (autoCompleteTimerRef.current) {
      clearTimeout(autoCompleteTimerRef.current);
    }
  }, []);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (autoCompleteTimerRef.current) {
      clearTimeout(autoCompleteTimerRef.current);
    }
  }, []);

  return {
    // State
    activeInterview,
    interviewStarted,
    currentQuestion,
    timeElapsed,
    interviewCompleted,
    interviewScore,
    userResponses,
    currentUserResponse,
    avatarReady,
    isWaitingForResponse,
    
    // Actions
    startInterview,
    handleAvatarSpeak,
    handleUserResponse,
    handleSessionReady,
    completeInterview,
    pauseInterview,
    nextQuestion,
    resetInterview,
    cleanup
  };
};
