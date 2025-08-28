import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Award, 
  Briefcase, 
  ChevronRight, 
  Globe, 
  GraduationCap, 
  Mail, 
  MapPin, 
  Phone, 
  User 
} from "lucide-react";
import { forwardRef } from "react";
import { ResumeData } from "@/types/student/resume-builder";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resumeData }, ref) => {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-0">
          <div ref={ref} className="bg-white text-foreground p-8 space-y-6">
            {/* Header */}
            <div className="text-center pb-6 border-b">
              <h1 className="text-3xl font-bold text-primary">
                {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
              </h1>
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {resumeData.personalInfo.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {resumeData.personalInfo.phone}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {resumeData.personalInfo.location}
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  {resumeData.personalInfo.portfolio}
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
                <User className="w-5 h-5" />
                Professional Summary
              </h2>
              <p className="text-sm leading-relaxed">{resumeData.personalInfo.bio}</p>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Professional Experience
              </h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-muted pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{exp.position}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </p>
                    </div>
                    <p className="text-sm mb-2 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Education
              </h2>
              <div className="space-y-3">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-muted pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                        <p className="text-primary">{edu.institution}</p>
                        {edu.gpa && <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3">Technical Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Key Achievements
              </h2>
              <ul className="space-y-1">
                {resumeData.achievements.map((achievement, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <ChevronRight className="w-3 h-3 mt-1 text-primary flex-shrink-0" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3">Languages</h2>
              <div className="grid grid-cols-3 gap-4">
                {resumeData.languages.map((lang, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-muted-foreground ml-2">({lang.level})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
