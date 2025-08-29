import { Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingData } from "./OnboardingFlow";
import { Button } from "./ui/button";

const QuickActions = ({currentCourses, setActiveCourse}: {currentCourses: any, setActiveCourse: any}) => {


    const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [learnerProfile, setLearnerProfile] = useState<OnboardingData | null>(null);
  const [showCourseRecommendations, setShowCourseRecommendations] = useState(false);



  const handleOnboardingComplete = (data: OnboardingData) => {
    setLearnerProfile(data);
    setShowOnboarding(false);
    setShowCourseRecommendations(true);
    // Here you would typically save to backend/Supabase
    console.log('Onboarding completed:', data);
  };


  const handleStartCourse = (courseId: string | number) => {
    console.log("Starting course:", courseId);
    setShowCourseRecommendations(false);
    
    // Find the course by ID and set it as active
    const course = currentCourses.find(c => c.id.toString() === courseId.toString());
    if (course) {
      setActiveCourse(course);
    }
  };




  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Your Learning Journey</h2>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate("/student/onboarding/confirmation")}
      >
        <Settings className="w-4 h-4 mr-2" />
        AI Career Path
      </Button>
    </div>
  );
};

export default QuickActions;
