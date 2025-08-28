import { Button } from "@/components/ui/button";
import { Edit, Save } from "lucide-react";

interface ProfileHeaderProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
}

const ProfileHeader = ({ isEditing, onEdit, onSave }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and background</p>
      </div>
      <Button
        onClick={isEditing ? onSave : onEdit}
        className={isEditing ? "bg-gradient-to-r from-primary to-accent text-white" : ""}
      >
        {isEditing ? (
          <>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </>
        ) : (
          <>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </>
        )}
      </Button>
    </div>
  );
};

export default ProfileHeader;
