"use client";

import { useSingleProjectQuery } from "@/hooks/queries/projects/use-single-project-query";
import { ClockIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import { dotToComma } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface ProjectStatsProps {
  id: string;
}

export const ProjectStats = ({ id }: ProjectStatsProps) => {
  const { data: project } = useSingleProjectQuery(id);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Stundensatz</CardTitle>
          <ClockIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {project?.hourlyRate ? `€${dotToComma(project?.hourlyRate)}/h` : "-"}
          </div>
          <p className="text-xs text-muted-foreground">Editierbar in Einstellungen</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Offene Aufgaben</CardTitle>
          <EyeOpenIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{project?.openTasks}</div>
          <p className="text-xs text-muted-foreground">Nicht vollständig abgerechnet</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Noch nicht abgerechnet</CardTitle>
          <Icons.euro className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{dotToComma(project?.notBilledAmount)}</div>
          <p className="text-xs text-muted-foreground">Aus Rechnungsposten</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Abgerechnet</CardTitle>
          <Icons.euro className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{dotToComma(project?.billedAmount)}</div>
          <p className="text-xs text-muted-foreground">Aus Rechnungsposten</p>
        </CardContent>
      </Card>
    </div>
  );
};
