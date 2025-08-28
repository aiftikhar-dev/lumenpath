import { useState, useRef } from "react";
import { ResumeData, ChatMessage, AIResponse } from "@/types/student/resume-builder";
import { defaultResumeData } from "@/mock-data/student/resume-builder";

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI Resume Assistant. I can help you improve your resume by suggesting better descriptions, adding missing sections, or reformatting content. What would you like to work on?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Apply changes if any
      if (aiResponse.updates) {
        setResumeData(prev => ({ ...prev, ...aiResponse.updates }));
      }
      
      setIsGenerating(false);
    }, 2000);
  };

  const generateAIResponse = (userInput: string): AIResponse => {
    const input = userInput.toLowerCase();
    
    if (input.includes('improve') || input.includes('better')) {
      return {
        content: "I've enhanced your experience descriptions to be more impactful and quantified your achievements. Your resume now better showcases your AI expertise and measurable contributions.",
        updates: {
          experience: resumeData.experience.map(exp => ({
            ...exp,
            description: exp.description + " Demonstrated strong problem-solving skills and delivered measurable business impact."
          }))
        }
      };
    }
    
    if (input.includes('skills') || input.includes('add')) {
      return {
        content: "I've added some trending AI skills that align with your background. These additions will make your resume more competitive in the current job market.",
        updates: {
          skills: [...resumeData.skills, "Large Language Models", "MLOps", "Edge AI", "Federated Learning"]
        }
      };
    }
    
    if (input.includes('summary') || input.includes('bio')) {
      return {
        content: "I've optimized your professional summary to better highlight your AI expertise and career achievements. The new version is more compelling and ATS-friendly.",
        updates: {
          personalInfo: {
            ...resumeData.personalInfo,
            bio: "Results-driven AI Research Engineer with 2+ years of experience developing cutting-edge machine learning solutions. Proven track record of improving operational efficiency by 40% through innovative AI implementations. Expert in deep learning, NLP, and computer vision with strong background in deploying scalable AI systems."
          }
        }
      };
    }
    
    return {
      content: "I understand you'd like to enhance your resume. I can help with improving descriptions, adding skills, optimizing your summary, or formatting improvements. Could you be more specific about what you'd like me to focus on?",
      updates: null
    };
  };

  const downloadAsPDF = async () => {
    if (!resumeRef.current) return;
    
    setIsDownloading(true);
    
    try {
      // Note: html2canvas and jsPDF would need to be imported here
      // For now, we'll simulate the download process
      console.log('PDF download functionality would be implemented here');
      
      // Simulate download delay
      setTimeout(() => {
        setIsDownloading(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsDownloading(false);
    }
  };

  return {
    resumeData,
    setResumeData,
    showChat,
    setShowChat,
    messages,
    inputMessage,
    setInputMessage,
    isGenerating,
    isDownloading,
    resumeRef,
    handleSendMessage,
    downloadAsPDF
  };
};
