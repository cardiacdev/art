"use client";

import { useSingleProjectQuery } from "@/hooks/queries/projects/use-single-project-query";
import { ClockIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import { dotToComma } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

import { ProjectStatsCard } from "./project-stats-card";

interface ProjectStatsProps {
  id: string;
}

export const ProjectStats = ({ id }: ProjectStatsProps) => {
  const { data: project } = useSingleProjectQuery(id);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <ProjectStatsCard
        title="Stundensatz"
        icon={<ClockIcon className="h-4 w-4 text-muted-foreground" />}
        content={project?.hourlyRate ? `€${dotToComma(project?.hourlyRate)}/h` : "-"}
        description="Editierbar in Einstellungen"
      />
      <ProjectStatsCard
        title="Offene Aufgaben"
        icon={<EyeOpenIcon className="h-4 w-4 text-muted-foreground" />}
        content={`${project?.openTasks}`}
        description="Nicht vollständig abgerechnet"
      />
      <ProjectStatsCard
        title="Noch nicht abgerechnet"
        icon={<Icons.euro className="h-4 w-4 text-muted-foreground" />}
        content={`€${dotToComma(project?.notBilledAmount)}`}
        description="Aus Rechnungsposten"
      />
      <ProjectStatsCard
        title="Abgerechnet"
        icon={<Icons.euro className="h-4 w-4 text-muted-foreground" />}
        content={`€${dotToComma(project?.billedAmount)}`}
        description="Aus Rechnungsposten"
      />
    </div>
  );
};
