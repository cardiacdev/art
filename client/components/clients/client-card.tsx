import Link from "next/link";

import { ClientMember } from "@/types/clients";
import { iriToId } from "@/lib/utils";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface ClientCardProps {
  client: ClientMember;
}

export const ClientCard = ({ client }: ClientCardProps) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <Link href={`/clients/${iriToId(client["@id"])}`} className="hover:text-accent">
          <CardTitle className="text-2xl font-bold">{client.name}</CardTitle>
        </Link>
        <CardDescription>
          {client.projects?.map((project, idx) => (
            <>
              <Link
                key={project["@id"]}
                href={`/projects/${iriToId(project["@id"])}`}
                className="hover:underline">
                {project.name}
              </Link>
              {idx !== 0 && " / "}
            </>
          ))}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
