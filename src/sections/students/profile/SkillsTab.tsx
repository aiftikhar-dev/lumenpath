import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Plus, X } from "lucide-react";
import { useState } from "react";

interface SkillsTabProps {
  skills: string[];
  setSkills: (skills: string[]) => void;
  isEditing: boolean;
}

const SkillsTab = ({ skills, setSkills, isEditing }: SkillsTabProps) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-primary" />
          Skills & Technologies
        </CardTitle>
        <CardDescription>
          Manage your technical skills and competencies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isEditing && (
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a new skill..."
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
            <Button onClick={addSkill} disabled={!newSkill.trim()}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {skills.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground w-full">
              <Wrench className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No skills added yet.</p>
            </div>
          ) : (
            skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="flex items-center gap-1 py-1 px-3"
              >
                {skill}
                {isEditing && (
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </Badge>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsTab;
