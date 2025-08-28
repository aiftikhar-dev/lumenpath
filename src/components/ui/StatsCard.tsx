import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
  className?: string;
  valueClassName?: string;
  descriptionClassName?: string;
  iconClassName?: string;
}

const StatsCard = ({
  title,
  value,
  description,
  icon,
  className,
  valueClassName,
  descriptionClassName,
  iconClassName
}: StatsCardProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn("h-4 w-4 text-muted-foreground", iconClassName)}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", valueClassName)}>{value}</div>
        <p className={cn("text-xs text-muted-foreground", descriptionClassName)}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
