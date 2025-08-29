import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface OnboardingData {
  role: string;
  goal: string;
  experience: string[];
  interest: string;
  background: string;
  preferredPace: string;
}

interface OnboardingContextType {
  // Onboarding data
  data: Partial<OnboardingData>;
  completedData: OnboardingData | null;
  
  // UI state
  showRecommendations: boolean;
  showCustomCreator: boolean;
  
  // Page navigation
  currentPage: string;
  availablePages: string[];
  
  // Page navigation functions
  goToPage: (pageName: string) => void;
  nextPage: () => void;
  previousPage: () => void;
  canGoToNextPage: () => boolean;
  canGoToPreviousPage: () => boolean;
  goToFirstPage: () => void;
  
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
  
  // Navigation handlers
  handleNext: () => void;
  handlePrevious: () => void;
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
  const location = useLocation();
  const pathname = location.pathname;

  
  const [data, setData] = useState<Partial<OnboardingData>>({
    experience: []
  });
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showCustomCreator, setShowCustomCreator] = useState(false);
  const [completedData, setCompletedData] = useState<OnboardingData | null>(null);
  
  // Page navigation state
  const [currentPage, setCurrentPage] = useState("confirmation");
  const availablePages = ["confirmation", "learning-path", "assessment", "profile-setup", "completion"];

  // Page navigation functions
  const navigate = useNavigate();
  const baseUrl = '/student/onboarding';

  const goToPage = (pageName: string) => {
    if (availablePages.includes(pageName)) {
      setCurrentPage(pageName);
      navigate(`${baseUrl}/${pageName}`);
    }
  };

  const nextPage = () => {
    const currentIndex = availablePages.indexOf(currentPage);
   
    
    if (currentIndex < availablePages.length - 1) {
      const nextPageName = availablePages[currentIndex + 1];
      console.log(nextPageName,availablePages,currentIndex);
      
      setCurrentPage(nextPageName);
      navigate(`${baseUrl}/${nextPageName}`);
    }
  };

  const previousPage = () => {
    const currentIndex = availablePages.indexOf(currentPage);
    if (currentIndex > 0) {
      const prevPageName = availablePages[currentIndex - 1];
      setCurrentPage(prevPageName);
      navigate(`${baseUrl}/${prevPageName}`);
    }
  };

  const canGoToNextPage = () => {
    const currentIndex = availablePages.indexOf(currentPage);
    return currentIndex < availablePages.length - 1;
  };

  const canGoToPreviousPage = () => {
    const currentIndex = availablePages.indexOf(currentPage);
    return currentIndex > 0;
  };

  const goToFirstPage = () => {
    const firstPage = availablePages[0];
    setCurrentPage(firstPage);
    navigate(`${baseUrl}/${firstPage}`);
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
    navigate(`/student`);
  };

  const resetOnboarding = () => {
    setData({ experience: [] });
    setShowRecommendations(false);
    setShowCustomCreator(false);
    setCompletedData(null);
    setCurrentPage("confirmation");
    navigate(`${baseUrl}/confirmation`);
  };

  const handleNext = () => {
    // Save current page data (data is already saved in context state)
    console.log('Saving data for page', currentPage, ':', data);
    console.log(canGoToNextPage());
    
    // Navigate to next page if available
    if (canGoToNextPage()) {
      nextPage();
    } else {
      // If no more pages, complete onboarding
      completeOnboarding();
    }
  };

  const handlePrevious = () => {
    // Save current page data before going back
    console.log('Saving data for page', currentPage, 'before going back:', data);
    
    // Navigate to previous page if available
    if (canGoToPreviousPage()) {
      previousPage();
    }
  };

  const startCourse = (courseId: string) => {
    onStartCourse?.(courseId);
  };

  const createCustomCourse = () => {
    setShowCustomCreator(true);
    setShowRecommendations(false);
  };

  useEffect(() => {
    const page = pathname.split('/').pop();
    if (page && availablePages.includes(page)) {
      setCurrentPage(page);
    }
   
  }, [pathname]);

  const contextValue: OnboardingContextType = {
    data,
    completedData,
    showRecommendations,
    showCustomCreator,
    currentPage,
    availablePages,
    goToPage,
    nextPage,
    previousPage,
    canGoToNextPage,
    canGoToPreviousPage,
    goToFirstPage,
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
    handleNext,
    handlePrevious
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
