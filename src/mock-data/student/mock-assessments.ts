import { AssessmentType, AssessmentQuestion, AssessmentResult } from "@/types/student/mock-assessments";
import { Languages, User, Code } from "lucide-react";

export const assessmentTypes: AssessmentType[] = [
  {
    id: "english",
    title: "English Assessment",
    description: "Evaluate your English proficiency including grammar, vocabulary, and comprehension",
    icon: Languages,
    duration: "30 minutes",
    questions: 25,
    difficulty: "Intermediate",
    category: "Language",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "personal",
    title: "Personal Assessment",
    description: "Discover your personality traits, work style, and behavioral preferences",
    icon: User,
    duration: "20 minutes",
    questions: 40,
    difficulty: "All Levels",
    category: "Personality",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "technical",
    title: "Technical Assessment",
    description: "Test your programming skills, problem-solving abilities, and technical knowledge",
    icon: Code,
    duration: "45 minutes",
    questions: 30,
    difficulty: "Advanced",
    category: "Technical",
    color: "from-green-500 to-emerald-500"
  }
];

export const sampleQuestions: Record<string, AssessmentQuestion[]> = {
  english: [
    {
      question: "Choose the correct form: 'She _____ to the meeting yesterday.'",
      options: ["go", "goes", "went", "going"],
      correct: 2,
      type: "multiple"
    },
    {
      question: "What is the synonym of 'abundant'?",
      options: ["scarce", "plentiful", "limited", "rare"],
      correct: 1,
      type: "multiple"
    },
    {
      question: "Read the passage and answer: 'The company's new policy aims to improve work-life balance.' What is the main purpose?",
      options: ["Increase productivity", "Improve work-life balance", "Reduce costs", "Hire more employees"],
      correct: 1,
      type: "reading"
    }
  ],
  personal: [
    {
      question: "How do you typically handle stressful situations?",
      options: [
        "I stay calm and analyze the problem step by step",
        "I seek help from colleagues or supervisors",
        "I take a break to clear my mind before tackling it",
        "I work harder and faster to overcome the stress"
      ],
      type: "personality"
    },
    {
      question: "In team meetings, you usually:",
      options: [
        "Lead the discussion and present ideas",
        "Listen carefully and contribute when asked",
        "Ask questions to clarify points",
        "Take notes and follow up after the meeting"
      ],
      type: "personality"
    },
    {
      question: "Your ideal work environment is:",
      options: [
        "Collaborative and team-oriented",
        "Quiet and independent",
        "Dynamic and fast-paced",
        "Structured and organized"
      ],
      type: "personality"
    }
  ],
  technical: [
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
      correct: 1,
      type: "multiple"
    },
    {
      question: "In React, which hook is used for side effects?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correct: 1,
      type: "multiple"
    },
    {
      question: "What does REST stand for in web development?",
      options: [
        "Reliable State Transfer",
        "Representational State Transfer", 
        "Remote State Technology",
        "Responsive State Template"
      ],
      correct: 1,
      type: "multiple"
    }
  ]
};

export const assessmentResults: Record<string, AssessmentResult> = {
  english: {
    score: 85,
    level: "Upper Intermediate",
    strengths: ["Grammar", "Vocabulary", "Reading Comprehension"],
    improvements: ["Writing Skills", "Advanced Grammar"],
    recommendations: [
      "Practice advanced grammar exercises",
      "Read more complex articles and literature",
      "Take business English course"
    ]
  },
  personal: {
    score: 92,
    type: "Analytical Thinker",
    traits: ["Detail-oriented", "Problem Solver", "Team Player", "Adaptable"],
    workStyle: "Collaborative with independent thinking",
    recommendations: [
      "Consider leadership roles",
      "Develop presentation skills",
      "Explore project management opportunities"
    ]
  },
  technical: {
    score: 78,
    level: "Intermediate",
    strengths: ["Data Structures", "Web Development", "Problem Solving"],
    improvements: ["System Design", "Database Optimization"],
    recommendations: [
      "Study system design patterns",
      "Practice coding challenges",
      "Learn advanced database concepts"
    ]
  }
};
