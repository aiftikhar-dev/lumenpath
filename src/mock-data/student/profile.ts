import { PersonalInfo, Education, Experience } from "@/types/student/profile";

export const defaultPersonalInfo: PersonalInfo = {
  firstName: "Ahmad",
  lastName: "Hassan",
  email: "ahmad.hassan@email.com",
  phone: "+971-50-123-4567",
  location: "Dubai, UAE",
  bio: "Passionate AI researcher and data scientist with expertise in machine learning, deep learning, and natural language processing. Experienced in developing innovative AI solutions for real-world problems with a focus on delivering measurable business impact.",
  portfolio: "https://ahmadhassan-portfolio.com",
  github: "github.com/ahmadhassanai",
  linkedin: "linkedin.com/in/ahmad-hassan-ai"
};

export const defaultEducation: Education[] = [
  {
    id: "1",
    institution: "American University of Sharjah",
    degree: "Master of Science",
    field: "Computer Science - AI Track",
    startDate: "2021-09-01",
    endDate: "2023-06-30",
    gpa: "3.8",
    description: "Specialized in machine learning, deep learning, and natural language processing. Completed thesis on 'Advanced Neural Networks for Arabic Language Processing' with distinction."
  },
  {
    id: "2",
    institution: "University of Sharjah",
    degree: "Bachelor of Science",
    field: "Computer Engineering",
    startDate: "2017-09-01",
    endDate: "2021-06-30",
    gpa: "3.6",
    description: "Graduated Magna Cum Laude with focus on software engineering and data structures. Active member of IEEE student chapter and AI research group."
  }
];

export const defaultExperience: Experience[] = [
  {
    id: "1",
    company: "Emirates AI Labs",
    position: "AI Research Engineer",
    startDate: "2023-07-01",
    endDate: "",
    current: true,
    description: "Led development of AI-powered customer service chatbots, improving response accuracy by 40%. Collaborated with cross-functional teams to implement machine learning models in production environments. Mentored 3 junior developers and contributed to 5 successful AI product launches.",
    technologies: ["Python", "TensorFlow", "PyTorch", "AWS", "Docker", "Kubernetes"]
  },
  {
    id: "2",
    company: "ADNOC Digital",
    position: "Data Science Intern",
    startDate: "2022-06-01",
    endDate: "2023-06-30",
    current: false,
    description: "Developed predictive analytics models for oil & gas operations, contributing to 15% efficiency improvement. Worked with big data technologies to process and analyze geological data. Presented findings to senior management and contributed to strategic decision-making.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Apache Spark", "SQL", "Tableau"]
  },
  {
    id: "3",
    company: "AUS Innovation Hub",
    position: "Research Assistant",
    startDate: "2021-01-01",
    endDate: "2022-05-31",
    current: false,
    description: "Conducted research on computer vision applications for autonomous vehicles. Co-authored 2 research papers published in international conferences. Developed prototype applications using OpenCV and deep learning frameworks.",
    technologies: ["Python", "OpenCV", "TensorFlow", "MATLAB", "C++"]
  }
];

export const defaultSkills: string[] = [
  "Machine Learning", "Deep Learning", "Python", "TensorFlow", "PyTorch",
  "Natural Language Processing", "Computer Vision", "Data Analysis", "Statistical Modeling",
  "AWS", "Docker", "Kubernetes", "SQL", "MongoDB", "Apache Spark",
  "React", "Node.js", "JavaScript", "Git", "Linux", "Agile/Scrum",
  "Research & Development", "Technical Writing", "Project Management"
];
