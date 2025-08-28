import { ReactNode } from "react";
import { Button } from "./button";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  showBadge?: boolean;
  badgeText?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  actions?: ReactNode;
}

const PageHeader = ({
  title,
  description,
  children,
  className,
  showBadge = false,
  badgeText,
  badgeVariant = "secondary",
  actions
}: PageHeaderProps) => {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{title}</h1>
            {showBadge && badgeText && (
              <Badge variant={badgeVariant} className="text-sm px-3 py-1">
                {badgeText}
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-muted-foreground text-lg">
              {description}
            </p>
          )}
          {children}
        </div>
        {actions && (
          <div className="flex items-center gap-2 ml-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
