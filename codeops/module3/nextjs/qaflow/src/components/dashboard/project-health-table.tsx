import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight } from "lucide-react";

interface ProjectHealthItem {
  id: string;
  name: string;
  key: string;
  totalTests: number;
  passRate: number;
  openBugs: number;
  lastRunDate: string;
  status: string;
}

interface ProjectHealthTableProps {
  projects: ProjectHealthItem[];
}

export function ProjectHealthTable({ projects }: ProjectHealthTableProps) {
  return (
    <Card className="border shadow-sm col-span-1 lg:col-span-2">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-semibold">
            Project Health Overview
          </CardTitle>
          <CardDescription className="text-xs">
            Live pass rates, active bug counts, and last test runs across
            workspaces
          </CardDescription>
        </div>
        <Link
          href="/projects"
          className="text-xs text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
        >
          View All Projects
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 dark:bg-slate-900/50">
              <TableHead className="text-xs font-semibold">Project</TableHead>
              <TableHead className="text-xs font-semibold">Key</TableHead>
              <TableHead className="text-xs font-semibold">
                Total Tests
              </TableHead>
              <TableHead className="text-xs font-semibold">Pass Rate</TableHead>
              <TableHead className="text-xs font-semibold">Open Bugs</TableHead>
              <TableHead className="text-xs font-semibold">Last Run</TableHead>
              <TableHead className="text-xs font-semibold text-right">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p) => (
              <TableRow
                key={p.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-900/60"
              >
                <TableCell className="font-medium text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold text-[10px]">
                      {p.key.slice(0, 2)}
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {p.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {p.key}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-slate-600 dark:text-slate-400">
                  {p.totalTests} tests
                </TableCell>
                <TableCell className="text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          p.passRate >= 80
                            ? "bg-emerald-500"
                            : p.passRate >= 60
                              ? "bg-amber-500"
                              : "bg-rose-500"
                        }`}
                        style={{ width: `${p.passRate}%` }}
                      />
                    </div>
                    <span className="font-semibold text-[11px] text-slate-700 dark:text-slate-300">
                      {p.passRate}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-xs">
                  {p.openBugs > 0 ? (
                    <Badge
                      variant="destructive"
                      className="text-[10px] px-1.5 py-0"
                    >
                      {p.openBugs} bugs
                    </Badge>
                  ) : (
                    <Badge variant="pass" className="text-[10px] px-1.5 py-0">
                      0 bugs
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-xs text-slate-500">
                  {p.lastRunDate}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={p.status === "ACTIVE" ? "pass" : "secondary"}
                    className="text-[10px] uppercase"
                  >
                    {p.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
