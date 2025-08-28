import MockInterviews from "@/components/MockInterviews";
import QuickActions from "@/components/QuickActions";
import QuickStats from "@/components/QuickStats";
import WelcomeBanner from "@/components/WelcomeBanner";
import { useState } from "react";

const MockInterviewsView = () => {
  const [currentCourses] = useState([
    {
      id: 1,
      title: "AI Fundamentals",
      progress: 68,
      nextLesson: "Neural Network Basics",
      timeRemaining: "2h 15m",
      difficulty: "Beginner",
      instructor: "Dr. Aisha Al-Maktoum",
      modules: [
        {
          title: "Introduction to AI",
          duration: "45 mins",
          lessons: [
            {
              title: "What is Artificial Intelligence?",
              duration: "15 mins",
              type: "video",
            },
            {
              title: "History of AI",
              duration: "20 mins",
              type: "interactive",
            },
            {
              title: "AI Applications Today",
              duration: "10 mins",
              type: "case_study",
            },
          ],
          quiz: { questions: 5, passingScore: 80 },
          caseStudy: {
            title: "AI in Healthcare",
            scenario:
              "Explore how AI is revolutionizing medical diagnosis and treatment",
            deliverables: [
              "Analysis Report",
              "Implementation Plan",
              "ROI Calculation",
            ],
          },
        },
        {
          title: "Machine Learning Fundamentals",
          duration: "60 mins",
          lessons: [
            {
              title: "Types of Machine Learning",
              duration: "20 mins",
              type: "video",
            },
            {
              title: "Supervised Learning",
              duration: "25 mins",
              type: "hands_on",
            },
            {
              title: "Unsupervised Learning",
              duration: "15 mins",
              type: "simulation",
            },
          ],
          quiz: { questions: 8, passingScore: 75 },
          caseStudy: {
            title: "Customer Segmentation",
            scenario:
              "Use ML algorithms to segment customers for targeted marketing",
            deliverables: [
              "Segmentation Model",
              "Marketing Strategy",
              "Performance Metrics",
            ],
          },
        },
      ],
    },
    {
      id: 2,
      title: "Python for Data Science",
      progress: 45,
      nextLesson: "Pandas DataFrames",
      timeRemaining: "4h 30m",
      difficulty: "Intermediate",
      instructor: "Prof. Omar Al-Hashmi",
      modules: [
        {
          title: "Python Basics Review",
          duration: "30 mins",
          lessons: [
            {
              title: "Variables and Data Types",
              duration: "10 mins",
              type: "video",
            },
            {
              title: "Control Structures",
              duration: "20 mins",
              type: "hands_on",
            },
          ],
          quiz: { questions: 6, passingScore: 80 },
        },
        {
          title: "Data Manipulation with Pandas",
          duration: "90 mins",
          lessons: [
            {
              title: "DataFrames Introduction",
              duration: "30 mins",
              type: "video",
            },
            { title: "Data Cleaning", duration: "45 mins", type: "hands_on" },
            {
              title: "Advanced Operations",
              duration: "15 mins",
              type: "interactive",
            },
          ],
          quiz: { questions: 10, passingScore: 85 },
        },
      ],
    },
    {
      id: 3,
      title: "Cloud Computing Basics",
      progress: 23,
      nextLesson: "AWS Introduction",
      timeRemaining: "6h 45m",
      difficulty: "Beginner",
      instructor: "Dr. Layla Al-Maktoum",
    },
  ]);
  const [interviewStats] = useState({
    completedInterviews: 8,
    averageScore: 82,
    totalPracticeTime: 12,
    upcomingInterviews: 2,
  });

  return (
    <div className="space-y-6">
      <WelcomeBanner
        userName="Ahmad"
        currentGoal="AI Researcher"
        overallProgress={34}
      />

      <QuickStats
        variant="mock-interviews"
        data={{
          completedInterviews: interviewStats.completedInterviews,
          averageScore: interviewStats.averageScore,
          totalPracticeTime: interviewStats.totalPracticeTime,
          upcomingInterviews: interviewStats.upcomingInterviews,
        }}
      />

      <QuickActions
        currentCourses={currentCourses}
        setActiveCourse={() => {}}
      />
      <MockInterviews />
    </div>
  );
};

export default MockInterviewsView;
