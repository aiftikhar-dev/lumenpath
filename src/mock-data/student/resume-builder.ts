import { ResumeData } from "@/types/student/resume-builder";

export const defaultResumeData: ResumeData = {
  personalInfo: {
    firstName: "Ahmad",
    lastName: "Hassan",
    email: "ahmad.hassan@email.com",
    phone: "+971-50-123-4567",
    location: "Dubai, UAE",
    bio: "Passionate AI researcher and data scientist with expertise in machine learning, deep learning, and natural language processing. Experienced in developing innovative AI solutions for real-world problems.",
    portfolio: "https://ahmadhassan-portfolio.com"
  },
  education: [
    {
      institution: "American University of Sharjah",
      degree: "Master of Science",
      field: "Computer Science - AI Track",
      startDate: "2021",
      endDate: "2023",
      gpa: "3.8/4.0"
    },
    {
      institution: "University of Sharjah",
      degree: "Bachelor of Science",
      field: "Computer Engineering",
      startDate: "2017",
      endDate: "2021",
      gpa: "3.6/4.0"
    }
  ],
  experience: [
    {
      company: "Emirates AI Labs",
      position: "AI Research Engineer",
      startDate: "2023",
      endDate: "",
      current: true,
      description: "Led development of AI-powered customer service chatbots, improving response accuracy by 40%. Collaborated with cross-functional teams to implement machine learning models in production environments.",
      technologies: ["Python", "TensorFlow", "PyTorch", "AWS", "Docker"]
    },
    {
      company: "ADNOC Digital",
      position: "Data Science Intern",
      startDate: "2022",
      endDate: "2023",
      current: false,
      description: "Developed predictive analytics models for oil & gas operations, contributing to 15% efficiency improvement. Worked with big data technologies to process and analyze geological data.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Apache Spark", "SQL"]
    }
  ],
  skills: [
    "Machine Learning", "Deep Learning", "Python", "TensorFlow", "PyTorch",
    "Natural Language Processing", "Computer Vision", "Data Analysis",
    "AWS", "Docker", "Kubernetes", "SQL", "MongoDB", "React", "Node.js"
  ],
  achievements: [
    "Winner - UAE AI Challenge 2023",
    "Best Student Project - AUS Computer Science 2023",
    "Published 3 research papers in AI conferences",
    "Google Developer Expert - Machine Learning",
    "AWS Certified Machine Learning Specialist"
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "French", level: "Intermediate" }
  ]
};
