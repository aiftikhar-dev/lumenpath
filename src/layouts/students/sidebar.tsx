import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Brain, 
  BookOpen, 
  Users, 
  Trophy, 
  Target,
  TrendingUp,
  MessageCircle,
  Mic,
  Briefcase,
  User,
  FileText,
  ClipboardCheck,
  Home,
  BarChart3,
  Settings,
  X
} from "lucide-react";
import { studentNavigation, StudentNavigationItem } from "@/navigations/students.navigation";

interface StudentSidebarProps {
  activeTab?: string;
  onShowOnboarding?: () => void;
}

const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    Home,
    Brain,
    Users,
    Target,
    TrendingUp,
    MessageCircle,
    BookOpen,
    Mic,
    Briefcase,
    User,
    FileText,
    ClipboardCheck,
    BarChart3
  };
  
  return iconMap[iconName] || Home;
};

export const StudentSidebar = ({ activeTab = "dashboard", onShowOnboarding }: StudentSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const currentPath = location.pathname;
  const currentTab = studentNavigation.find(item => 
    currentPath.includes(item.id) || currentPath === item.path
  )?.id || activeTab;

  return (
    <SidebarProvider>
      <div className={`bg-card border-r transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-ai-primary" />
                  <span className="font-bold text-lg">LumenPath</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="ml-auto"
              >
                {isCollapsed ? <X className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {studentNavigation.map((item) => {
              const IconComponent = getIconComponent(item.icon);
              const isActive = currentTab === item.id;
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-ai-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <IconComponent className={`w-5 h-5 ${
                    isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`} />
                  {!isCollapsed && (
                    <span className={`font-medium ${
                      isActive ? 'text-primary-foreground' : 'text-foreground'
                    }`}>
                      {item.title}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            {!isCollapsed && (
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={onShowOnboarding}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  AI Career Path
                </Button>
                <div className="text-xs text-muted-foreground text-center">
                  Student Portal v1.0
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
