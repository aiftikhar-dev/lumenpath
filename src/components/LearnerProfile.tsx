import LearnerProfileMain from "@/sections/students/profile/LearnerProfileMain";

interface LearnerProfileProps {
  initialData?: {
    personalInfo?: any;
    education?: any[];
    experience?: any[];
    skills?: string[];
  };
  onSave: (profileData: any) => void;
}

const LearnerProfile = ({ initialData, onSave }: LearnerProfileProps) => {
  return <LearnerProfileMain initialData={initialData} onSave={onSave} />;
};

export default LearnerProfile;