import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Plus, X } from "lucide-react";
import { Education } from "@/types/student/profile";

interface EducationTabProps {
  education: Education[];
  setEducation: (education: Education[]) => void;
  isEditing: boolean;
}

const EducationTab = ({ education, setEducation, isEditing }: EducationTabProps) => {
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    setEducation([...education, newEdu]);
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, ...updates } : edu
    ));
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Education
            </CardTitle>
            <CardDescription>
              Add your educational background and qualifications
            </CardDescription>
          </div>
          {isEditing && (
            <Button onClick={addEducation} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {education.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No education information added yet.</p>
            {isEditing && (
              <Button onClick={addEducation} variant="outline" className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Education
              </Button>
            )}
          </div>
        ) : (
          education.map((edu, index) => (
            <div key={edu.id} className="space-y-4 p-4 border rounded-lg">
              {isEditing && (
                <div className="flex justify-end">
                  <Button
                    onClick={() => removeEducation(edu.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                    disabled={!isEditing}
                    placeholder="University Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Bachelor's, Master's, PhD, etc."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Field of Study</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Computer Science, Engineering, etc."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label>GPA (Optional)</Label>
                  <Input
                    value={edu.gpa || ""}
                    onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                    disabled={!isEditing}
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Relevant coursework, achievements, projects..."
                />
              </div>
              {index < education.length - 1 && <Separator />}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default EducationTab;
