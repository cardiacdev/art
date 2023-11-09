import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectStatsCardProps {
  title?: string;
  icon?: React.ReactNode;
  content?: string;
  description?: string;
}

export const ProjectStatsCard = ({ title, icon, content, description }: ProjectStatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {title && <CardTitle className="text-sm font-medium">{title}</CardTitle>}
        {icon && icon}
      </CardHeader>
      <CardContent>
        {content && <div className="text-2xl font-bold">{content}</div>}
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
};
