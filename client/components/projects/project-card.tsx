import Link from "next/link";

import { ProjectMember } from "@/types/projects";
import { iriToId } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface ProjectCardProps {
  project: ProjectMember;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const hourlyRateString = project?.hourlyRate ? `€${project?.hourlyRate}/h` : "Kein Stundensatz";
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <Link href={`/projects/${iriToId(project["@id"])}`} className="hover:text-accent">
          <CardTitle className="text-2xl font-bold">{project.name}</CardTitle>
        </Link>
        <CardDescription>
          <Link href={`/clients/${iriToId(project.client)}`} className="hover:underline">
            {project.clientName}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{hourlyRateString}</p>
      </CardContent>
    </Card>
  );
};
