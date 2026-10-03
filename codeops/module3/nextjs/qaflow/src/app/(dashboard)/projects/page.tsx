import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreateProjectDialog } from "@/components/projects/create-project-dialog";
import { FolderKanban, Layers, PlaySquare, Bug } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      id: "ecom",
      key: "ECOM",
      name: "E-Commerce Platform",
      description:
        "Modern cloud-native retail e-commerce platform with microservices checkout, inventory, and payment gateways.",
      suitesCount: 4,
      casesCount: 24,
      runsCount: 8,
      bugsCount: 2,
      status: "ACTIVE",
    },
    {
      id: "bank",
      key: "BANK",
      name: "Banking Portal",
      description:
        "High-security digital banking core handling multi-currency accounts, wire transfers, and regulatory compliance.",
      suitesCount: 3,
      casesCount: 16,
      runsCount: 3,
      bugsCount: 1,
      status: "ACTIVE",
    },
    {
      id: "pharm",
      key: "PHARM",
      name: "Pharmacy Management System",
      description:
        "Prescription verification, hospital dispensary tracking, and automated stock reordering platform.",
      suitesCount: 2,
      casesCount: 8,
      runsCount: 1,
      bugsCount: 1,
      status: "ACTIVE",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FolderKanban className="h-6 w-6 text-blue-600" />
            Projects
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage test workspaces, environments, and test suite repositories
          </p>
        </div>
        <CreateProjectDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`}>
            <Card className="border shadow-sm flex flex-col justify-between hover:border-blue-500 hover:shadow-md transition-all h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="outline"
                    className="font-mono font-bold text-xs"
                  >
                    {p.key}
                  </Badge>
                  <Badge variant="pass" className="text-[10px] uppercase">
                    {p.status}
                  </Badge>
                </div>
                <CardTitle className="text-base font-bold">{p.name}</CardTitle>
                <CardDescription className="text-xs line-clamp-2 mt-1">
                  {p.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 border-t mt-4 p-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-b-xl flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5 text-blue-500" />{" "}
                  {p.casesCount} Tests
                </span>
                <span className="flex items-center gap-1">
                  <PlaySquare className="h-3.5 w-3.5 text-purple-500" />{" "}
                  {p.runsCount} Runs
                </span>
                <span className="flex items-center gap-1">
                  <Bug className="h-3.5 w-3.5 text-rose-500" /> {p.bugsCount}{" "}
                  Bugs
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
