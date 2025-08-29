import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface OnboardingData {
  role: string;
  goal: string;
  experience: string[];
  interest: string;
  background: string;
  preferredPace: string;
}

interface OnboardingContextType {
  // Current step and progress
  step: number;
  totalSteps: number;
  progress: number;
  
  // Onboarding data
  data: Partial<OnboardingData>;
  completedData: OnboardingData | null;
  
  // UI state
  showRecommendations: boolean;
  showCustomCreator: boolean;
  
  // Step validation
  isStepValid: () => boolean;
  
  // Navigation functions
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  
  // Data management
  updateData: (updates: Partial<OnboardingData>) => void;
  updateRole: (role: string) => void;
  updateGoal: (goal: string) => void;
  updateExperience: (experience: string[]) => void;
  updateInterest: (interest: string) => void;
  updateBackground: (background: string) => void;
  updatePreferredPace: (pace: string) => void;
  
  // Skill management
  toggleSkill: (skill: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  
  // UI state management
  showRecommendationsView: () => void;
  showCustomCreatorView: () => void;
  hideAllViews: () => void;
  
  // Completion
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  
  // Course management
  startCourse: (courseId: string) => void;
  createCustomCourse: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

interface OnboardingProviderProps {
  children: ReactNode;
  onComplete?: (data: OnboardingData) => void;
  onStartCourse?: (courseId: string) => void;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ 
  children, 
  onComplete, 
  onStartCourse 
}) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<OnboardingData>>({
    experience: []
  });
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showCustomCreator, setShowCustomCreator] = useState(false);
  const [completedData, setCompletedData] = useState<OnboardingData | null>(null);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const isStepValid = (): boolean => {
    switch (step) {
      case 1: return !!data.role;
      case 2: return !!data.goal;
      case 3: return data.experience && data.experience.length > 0;
      case 4: return !!data.interest;
      case 5: return !!(data.background && data.preferredPace);
      default: return false;
    }
  };

  const nextStep = () => {
    if (step < totalSteps && isStepValid()) {
      setStep(step + 1);
    } else if (step === totalSteps && isStepValid()) {
      const completeData = data as OnboardingData;
      setCompletedData(completeData);
      setShowRecommendations(true);
      onComplete?.(completeData);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const goToStep = (targetStep: number) => {
    if (targetStep >= 1 && targetStep <= totalSteps) {
      setStep(targetStep);
    }
  };

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const updateRole = (role: string) => {
    updateData({ role });
  };

  const updateGoal = (goal: string) => {
    updateData({ goal });
  };

  const updateExperience = (experience: string[]) => {
    updateData({ experience });
  };

  const updateInterest = (interest: string) => {
    updateData({ interest });
  };

  const updateBackground = (background: string) => {
    updateData({ background });
  };

  const updatePreferredPace = (preferredPace: string) => {
    updateData({ preferredPace });
  };

  const toggleSkill = (skill: string) => {
    const currentSkills = data.experience || [];
    const newSkills = currentSkills.includes(skill) 
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];
    
    updateExperience(newSkills);
  };

  const addSkill = (skill: string) => {
    const currentSkills = data.experience || [];
    if (!currentSkills.includes(skill)) {
      updateExperience([...currentSkills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    const currentSkills = data.experience || [];
    updateExperience(currentSkills.filter(s => s !== skill));
  };

  const showRecommendationsView = () => {
    setShowRecommendations(true);
    setShowCustomCreator(false);
  };

  const showCustomCreatorView = () => {
    setShowCustomCreator(true);
    setShowRecommendations(false);
  };

  const hideAllViews = () => {
    setShowRecommendations(false);
    setShowCustomCreator(false);
  };

  const completeOnboarding = () => {
    const completeData = data as OnboardingData;
    setCompletedData(completeData);
    setShowRecommendations(true);
    onComplete?.(completeData);
  };

  const resetOnboarding = () => {
    setStep(1);
    setData({ experience: [] });
    setShowRecommendations(false);
    setShowCustomCreator(false);
    setCompletedData(null);
  };

  const startCourse = (courseId: string) => {
    onStartCourse?.(courseId);
  };

  const createCustomCourse = () => {
    setShowCustomCreator(true);
    setShowRecommendations(false);
  };

  const contextValue: OnboardingContextType = {
    step,
    totalSteps,
    progress,
    data,
    completedData,
    showRecommendations,
    showCustomCreator,
    isStepValid,
    nextStep,
    previousStep,
    goToStep,
    updateData,
    updateRole,
    updateGoal,
    updateExperience,
    updateInterest,
    updateBackground,
    updatePreferredPace,
    toggleSkill,
    addSkill,
    removeSkill,
    showRecommendationsView,
    showCustomCreatorView,
    hideAllViews,
    completeOnboarding,
    resetOnboarding,
    startCourse,
    createCustomCourse,
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export default OnboardingContext;
