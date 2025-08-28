import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role, Region } from "@/types/student/market-skill-comparison";

interface MarketSkillHeaderProps {
  selectedRole: string;
  selectedRegion: string;
  roles: Role[];
  regions: Region[];
  onRoleChange: (role: string) => void;
  onRegionChange: (region: string) => void;
}

const MarketSkillHeader = ({
  selectedRole,
  selectedRegion,
  roles,
  regions,
  onRoleChange,
  onRegionChange
}: MarketSkillHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-ai-primary to-ai-accent bg-clip-text text-transparent">
          UAE Market Skill Analysis
        </h2>
        <p className="text-muted-foreground">Advanced comparison with UAE market standards, salary insights, and career opportunities</p>
      </div>
      <div className="flex gap-4">
        <Select value={selectedRole} onValueChange={onRoleChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedRegion} onValueChange={onRegionChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="UAE Emirates" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MarketSkillHeader;
