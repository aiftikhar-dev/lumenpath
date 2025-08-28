import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin 
} from "lucide-react";
import { PersonalInfo } from "@/types/student/profile";

interface PersonalInfoTabProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: (info: PersonalInfo) => void;
  isEditing: boolean;
}

const PersonalInfoTab = ({ personalInfo, setPersonalInfo, isEditing }: PersonalInfoTabProps) => {
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Personal Information
        </CardTitle>
        <CardDescription>
          Update your basic information and contact details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={personalInfo.firstName}
              onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={personalInfo.lastName}
              onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <Input
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <Input
              id="location"
              value={personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              disabled={!isEditing}
              placeholder="City, State, Country"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={personalInfo.bio}
            onChange={(e) => updatePersonalInfo('bio', e.target.value)}
            disabled={!isEditing}
            placeholder="Tell us about yourself, your interests, and your career goals..."
            className="min-h-[100px]"
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-semibold">Social Links</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio</Label>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="portfolio"
                  value={personalInfo.portfolio}
                  onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                  disabled={!isEditing}
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="github"
                  value={personalInfo.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  disabled={!isEditing}
                  placeholder="github.com/username"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="linkedin"
                  value={personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  disabled={!isEditing}
                  placeholder="linkedin.com/in/username"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoTab;
