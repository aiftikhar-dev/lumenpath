import {
  assessmentResults,
  assessmentTypes,
  sampleQuestions
} from "@/mock-data/student/mock-assessments";
import { AssessmentType } from "@/types/student/mock-assessments";
import { Brain } from "lucide-react";
import { useEffect, useState } from "react";
import AssessmentProgress from "./AssessmentProgress";
import AssessmentQuestionCard from "./AssessmentQuestionCard";
import AssessmentResultsCard from "./AssessmentResultsCard";
import AssessmentTypeCard from "./AssessmentTypeCard";
import PreviousResultsCard from "./PreviousResultsCard";

const MockAssessmentsMain = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  // Timer effect
  useEffect(() => {
    if (selectedAssessment && !showResults && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [selectedAssessment, showResults, timeLeft]);

  const startAssessment = (assessment: AssessmentType) => {
    setSelectedAssessment(assessment);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    
    // Set time based on assessment duration
    if (assessment.duration === "45 minutes") {
      setTimeLeft(2700);
    } else if (assessment.duration === "30 minutes") {
      setTimeLeft(1800);
    } else {
      setTimeLeft(1200);
    }
  };

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setAnswers({
      ...answers,
      [questionIndex]: answerIndex
    });
  };

  const nextQuestion = () => {
    if (selectedAssessment && currentQuestion < sampleQuestions[selectedAssessment.id].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const exitAssessment = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTimeLeft(1800);
  };

  // Show results
  if (showResults && selectedAssessment) {
    const result = assessmentResults[selectedAssessment.id];
    return (
      <AssessmentResultsCard
        assessment={selectedAssessment}
        result={result}
        onBackToAssessments={exitAssessment}
      />
    );
  }

  // Show active assessment
  if (selectedAssessment) {
    const questions = sampleQuestions[selectedAssessment.id];
    const question = questions[currentQuestion];
    
    return (
      <div className="space-y-6">
        <AssessmentProgress
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          timeLeft={timeLeft}
        />
        
        <AssessmentQuestionCard
          question={question}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          selectedAnswer={answers[currentQuestion]}
          onAnswerSelect={handleAnswer}
          onNextQuestion={nextQuestion}
          onExitAssessment={exitAssessment}
        />
      </div>
    );
  }

  // Show main dashboard
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Brain className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Mock Assessments</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Evaluate your skills and personality traits with our comprehensive assessment suite
        </p>
      </div>

      {/* Assessment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessmentTypes.map((assessment) => (
          <AssessmentTypeCard
            key={assessment.id}
            assessment={assessment}
            onStartAssessment={startAssessment}
          />
        ))}
      </div>

      {/* Previous Results */}
      <PreviousResultsCard
        assessmentTypes={assessmentTypes}
        assessmentResults={assessmentResults}
      />
    </div>
  );
};

export default MockAssessmentsMain;
