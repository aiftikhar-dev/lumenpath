import { MarketDemand } from "@/types/student/skill-gap-analysis";

export const marketDemands: MarketDemand[] = [
  {
    domain: "AI & Machine Learning",
    growth: "+45%",
    color: "hsl(245, 82%, 67%)",
    marketValue: "$2.8B",
    jobOpenings: "3,200+",
    avgSalary: "AED 180,000",
    topCompanies: ["ADNOC", "Emirates NBD", "Careem", "Mashreq Bank"],
    inDemandSkills: [
      { 
        skill: "Python", 
        demand: 95, 
        learnerLevel: 75, 
        gap: 20, 
        salaryImpact: "+35%",
        jobCount: 1850,
        difficulty: "Medium",
        timeToMaster: "4-6 months",
        courses: ["Python for AI - Coursera", "Advanced Python - edX"] 
      },
      { 
        skill: "Machine Learning", 
        demand: 90, 
        learnerLevel: 45, 
        gap: 45, 
        salaryImpact: "+48%",
        jobCount: 2100,
        difficulty: "High",
        timeToMaster: "8-12 months",
        courses: ["ML Course - Stanford", "Applied ML - Udacity"] 
      },
      { 
        skill: "Deep Learning", 
        demand: 85, 
        learnerLevel: 20, 
        gap: 65, 
        salaryImpact: "+52%",
        jobCount: 1650,
        difficulty: "Very High",
        timeToMaster: "12-18 months",
        courses: ["Deep Learning Specialization - Coursera", "Neural Networks - Udemy"] 
      },
      { 
        skill: "TensorFlow", 
        demand: 80, 
        learnerLevel: 10, 
        gap: 70, 
        salaryImpact: "+42%",
        jobCount: 1250,
        difficulty: "High",
        timeToMaster: "6-9 months",
        courses: ["TensorFlow Developer - Google", "TensorFlow Mastery - Pluralsight"] 
      },
      { 
        skill: "Data Analysis", 
        demand: 88, 
        learnerLevel: 60, 
        gap: 28, 
        salaryImpact: "+28%",
        jobCount: 2800,
        difficulty: "Medium",
        timeToMaster: "3-5 months",
        courses: ["Data Analysis with Python - IBM", "Statistical Analysis - MIT"] 
      },
      { 
        skill: "Neural Networks", 
        demand: 82, 
        learnerLevel: 15, 
        gap: 67, 
        salaryImpact: "+45%",
        jobCount: 980,
        difficulty: "Very High",
        timeToMaster: "10-15 months",
        courses: ["Neural Networks Course - DeepLearning.AI", "CNNs Specialization - Coursera"] 
      }
    ]
  },
  {
    domain: "Data Science",
    growth: "+38%",
    color: "hsl(15, 85%, 65%)",
    marketValue: "$1.9B",
    jobOpenings: "2,800+",
    avgSalary: "AED 145,000",
    topCompanies: ["Dubai Electricity", "Etisalat", "FAB", "Noon"],
    inDemandSkills: [
      { 
        skill: "Python", 
        demand: 92, 
        learnerLevel: 75, 
        gap: 17, 
        salaryImpact: "+32%",
        jobCount: 2200,
        difficulty: "Medium",
        timeToMaster: "4-6 months",
        courses: ["Python for Data Science - IBM", "Python Programming - Michigan"] 
      },
      { 
        skill: "SQL", 
        demand: 88, 
        learnerLevel: 50, 
        gap: 38, 
        salaryImpact: "+22%",
        jobCount: 3100,
        difficulty: "Low",
        timeToMaster: "2-3 months",
        courses: ["SQL for Data Science - UC Davis", "Advanced SQL - Udacity"] 
      },
      { 
        skill: "Statistics", 
        demand: 85, 
        learnerLevel: 40, 
        gap: 45, 
        salaryImpact: "+38%",
        jobCount: 1850,
        difficulty: "High",
        timeToMaster: "6-8 months",
        courses: ["Statistics for Data Science - Stanford", "Applied Statistics - Duke"] 
      },
      { 
        skill: "R Programming", 
        demand: 75, 
        learnerLevel: 20, 
        gap: 55, 
        salaryImpact: "+25%",
        jobCount: 950,
        difficulty: "Medium",
        timeToMaster: "3-5 months",
        courses: ["R Programming - Johns Hopkins", "Data Science with R - Harvard"] 
      },
      { 
        skill: "Data Visualization", 
        demand: 80, 
        learnerLevel: 55, 
        gap: 25, 
        salaryImpact: "+18%",
        jobCount: 1650,
        difficulty: "Medium",
        timeToMaster: "2-4 months",
        courses: ["Data Visualization - Tableau", "Advanced Plotting - MIT"] 
      }
    ]
  },
  {
    domain: "Cloud Computing",
    growth: "+42%",
    color: "hsl(142, 76%, 36%)",
    marketValue: "$3.2B",
    jobOpenings: "4,100+",
    avgSalary: "AED 195,000",
    topCompanies: ["Amazon Web Services", "Microsoft", "Google Cloud", "Oracle"],
    inDemandSkills: [
      { 
        skill: "AWS", 
        demand: 90, 
        learnerLevel: 30, 
        gap: 60, 
        salaryImpact: "+45%",
        jobCount: 2850,
        difficulty: "High",
        timeToMaster: "6-9 months",
        courses: ["AWS Solutions Architect - Amazon", "Cloud Practitioner - AWS"] 
      },
      { 
        skill: "Azure", 
        demand: 85, 
        learnerLevel: 25, 
        gap: 60, 
        salaryImpact: "+42%",
        jobCount: 2100,
        difficulty: "High",
        timeToMaster: "6-8 months",
        courses: ["Azure Fundamentals - Microsoft", "Azure Developer - Pluralsight"] 
      },
      { 
        skill: "Docker", 
        demand: 78, 
        learnerLevel: 20, 
        gap: 58, 
        salaryImpact: "+28%",
        jobCount: 1850,
        difficulty: "Medium",
        timeToMaster: "3-4 months",
        courses: ["Docker Mastery - Udemy", "Containerization - Linux Foundation"] 
      },
      { 
        skill: "Kubernetes", 
        demand: 75, 
        learnerLevel: 10, 
        gap: 65, 
        salaryImpact: "+38%",
        jobCount: 1450,
        difficulty: "Very High",
        timeToMaster: "8-12 months",
        courses: ["Kubernetes for Developers - Linux Foundation", "K8s Administration - CNCF"] 
      },
      { 
        skill: "DevOps", 
        demand: 82, 
        learnerLevel: 35, 
        gap: 47, 
        salaryImpact: "+35%",
        jobCount: 2250,
        difficulty: "High",
        timeToMaster: "6-10 months",
        courses: ["DevOps Engineering - AWS", "CI/CD Pipeline - GitLab"] 
      }
    ]
  }
];
