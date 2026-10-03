import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { InviteMemberDialog } from "@/components/team/invite-member-dialog";
import { Users } from "lucide-react";

export default function TeamPage() {
  const members = [
    {
      id: "u1",
      name: "Alex Vance",
      email: "admin@qaflow.dev",
      role: "ADMIN",
      badgeVariant: "destructive" as const,
      projectsCount: 3,
    },
    {
      id: "u2",
      name: "Sarah Jenkins",
      email: "manager@qaflow.dev",
      role: "QA_MANAGER",
      badgeVariant: "default" as const,
      projectsCount: 3,
    },
    {
      id: "u3",
      name: "Bonsa Tesfaye",
      email: "engineer@qaflow.dev",
      role: "QA_ENGINEER",
      badgeVariant: "pass" as const,
      projectsCount: 2,
    },
    {
      id: "u4",
      name: "John Doe",
      email: "john@qaflow.dev",
      role: "QA_ENGINEER",
      badgeVariant: "pass" as const,
      projectsCount: 2,
    },
    {
      id: "u5",
      name: "Elena Rostova",
      email: "viewer@qaflow.dev",
      role: "VIEWER",
      badgeVariant: "secondary" as const,
      projectsCount: 2,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            Team & Role Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage organization members, workspace memberships, and RBAC
            permissions
          </p>
        </div>
        <InviteMemberDialog />
      </div>

      <div className="space-y-3">
        {members.map((m) => (
          <Card key={m.id} className="border shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar fallback={m.name} className="h-10 w-10" />
                <div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                    {m.name}
                  </h3>
                  <p className="text-xs text-slate-500">{m.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500">
                  {m.projectsCount} Assigned Projects
                </span>
                <Badge
                  variant={m.badgeVariant}
                  className="text-[10px] uppercase font-semibold"
                >
                  {m.role.replace("QA_", "")}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
