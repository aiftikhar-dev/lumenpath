import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  defaultPersonalInfo, 
  defaultEducation, 
  defaultExperience, 
  defaultSkills 
} from "@/mock-data/student/profile";
import { PersonalInfo, Education, Experience, ProfileData } from "@/types/student/profile";
import ProfileHeader from "./ProfileHeader";
import PersonalInfoTab from "./PersonalInfoTab";
import EducationTab from "./EducationTab";
import ExperienceTab from "./ExperienceTab";
import SkillsTab from "./SkillsTab";

interface LearnerProfileMainProps {
  initialData?: {
    personalInfo?: PersonalInfo;
    education?: Education[];
    experience?: Experience[];
    skills?: string[];
  };
  onSave: (profileData: ProfileData) => void;
}

const LearnerProfileMain = ({ initialData, onSave }: LearnerProfileMainProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(
    initialData?.personalInfo || defaultPersonalInfo
  );
  const [education, setEducation] = useState<Education[]>(
    initialData?.education || defaultEducation
  );
  const [experience, setExperience] = useState<Experience[]>(
    initialData?.experience || defaultExperience
  );
  const [skills, setSkills] = useState<string[]>(
    initialData?.skills || defaultSkills
  );

  const handleSave = () => {
    const profileData: ProfileData = {
      personalInfo,
      education,
      experience,
      skills
    };
    onSave(profileData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ProfileHeader
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
      />

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoTab
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            isEditing={isEditing}
          />
        </TabsContent>

        <TabsContent value="education">
          <EducationTab
            education={education}
            setEducation={setEducation}
            isEditing={isEditing}
          />
        </TabsContent>

        <TabsContent value="experience">
          <ExperienceTab
            experience={experience}
            setExperience={setExperience}
            isEditing={isEditing}
          />
        </TabsContent>

        <TabsContent value="skills">
          <SkillsTab
            skills={skills}
            setSkills={setSkills}
            isEditing={isEditing}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearnerProfileMain;
