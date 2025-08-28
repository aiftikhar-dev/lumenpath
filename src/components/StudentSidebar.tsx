
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Brain,
  Users,
  Target,
  MessageSquare,
  BarChart3,
  Briefcase,
  GitCompare,
  Settings,
  Home,
  Trophy,
  User,
  LogOut,
  FileText,
  HelpCircle,
} from "lucide-react";
import { studentNavigation } from "@/navigations/students.navigation";

interface StudentSidebarProps {
  activeTab: string;
  onTabChange: (tabValue: string) => void;
  onShowOnboarding: () => void;
}

export function StudentSidebar({ activeTab, onTabChange, onShowOnboarding }: StudentSidebarProps) {
  const { state } = useSidebar();

  const isActive = (tabValue: string) => activeTab === tabValue;
  const getNavCls = (tabValue: string) =>
    isActive(tabValue) ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50";

  // Group navigation items by category
  const mainNavItems = studentNavigation.filter(item => 
    ['dashboard', 'adaptive-learning', 'study-buddies'].includes(item.id)
  );
  
  const analysisItems = studentNavigation.filter(item => 
    ['skill-analysis', 'market-skills-comparison', "mock-interviews","job-matching","mock-assessments"].includes(item.id)
  );
  
  const counselorItems = studentNavigation.filter(item => 
    ['ai-career-counselor', 'ai-educational-counselor'].includes(item.id)
  );

  const profileItems = studentNavigation.filter(item => 
    ['profile', 'resume-builder'].includes(item.id)
  );

  // Icon mapping for navigation items
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'Home': Home,
      'Brain': Brain,
      'Users': Users,
      'Target': Target,
      'MessageSquare': MessageSquare,
      'BarChart3': BarChart3,
      'Briefcase': Briefcase,
      'GitCompare': GitCompare,
      'User': User,
      'FileText': FileText,
      'BookOpen': BookOpen,
      'Trophy': Trophy,
      'TrendingUp': BarChart3,
      'Video': MessageSquare,
      'Heart': User,
      'Star': Trophy,
      'Award': Trophy,
      'Eye': FileText,
      'Zap': Brain,
      'Play': MessageSquare,
      'CheckCircle': Trophy,
      'Timer': BarChart3,
    };
    return iconMap[iconName] || Home;
  };

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="flex flex-col h-full">
        {/* Profile Section */}
        <div className={`p-4 border-b ${state === "collapsed" ? 'px-2' : ''}`}>
          <div className={`flex items-center ${state === "collapsed" ? 'justify-center' : 'gap-3'}`}>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary/10 text-primary">AH</AvatarFallback>
            </Avatar>
            {state !== "collapsed" && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Ahmad Hassan</span>
                <span className="text-xs text-muted-foreground">AI Student</span>
              </div>
            )}
          </div>
          {state !== "collapsed" && (
            <div className="mt-3 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Level 3
              </Badge>
              <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                78% Complete
              </Badge>
            </div>
          )}
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-auto">
          <SidebarGroup>
            <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
              Main
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNavItems.map((item) => {
                  const IconComponent = getIcon(item.icon);
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild>
                        <button
                          onClick={() => onTabChange(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${getNavCls(item.id)}`}
                        >
                          <IconComponent className="h-4 w-4" />
                          {state !== "collapsed" && <span>{item.title}</span>}
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
              Analysis & Growth
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {analysisItems.map((item) => {
                  const IconComponent = getIcon(item.icon);
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild>
                        <button
                          onClick={() => onTabChange(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${getNavCls(item.id)}`}
                        >
                          <IconComponent className="h-4 w-4" />
                          {state !== "collapsed" && <span>{item.title}</span>}
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
              AI Counselors
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {counselorItems.map((item) => {
                  const IconComponent = getIcon(item.icon);
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild>
                        <button
                          onClick={() => onTabChange(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${getNavCls(item.id)}`}
                        >
                          <IconComponent className="h-4 w-4" />
                          {state !== "collapsed" && <span>{item.title}</span>}
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
              Account
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {profileItems.map((item) => {
                  const IconComponent = getIcon(item.icon);
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild>
                        <button
                          onClick={() => onTabChange(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${getNavCls(item.id)}`}
                        >
                          <IconComponent className="h-4 w-4" />
                          {state !== "collapsed" && <span>{item.title}</span>}
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className={`w-full ${state === "collapsed" ? 'px-2' : 'justify-start'} text-muted-foreground hover:text-foreground`}
            onClick={() => window.open('/help/system-flow', '_blank')}
          >
            <HelpCircle className="h-4 w-4" />
            {state !== "collapsed" && <span className="ml-2">System Flow</span>}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full ${state === "collapsed" ? 'px-2' : 'justify-start'} text-muted-foreground hover:text-foreground`}
            onClick={() => {
              // Clear any stored user data
              localStorage.clear();
              sessionStorage.clear();
              // Redirect to login page
              window.location.href = '/';
            }}
          >
            <LogOut className="h-4 w-4" />
            {state !== "collapsed" && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
