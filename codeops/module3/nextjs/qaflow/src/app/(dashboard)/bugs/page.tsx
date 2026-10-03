import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreateBugDialog } from "@/components/bugs/create-bug-dialog";
import { Bug, Link2 } from "lucide-react";

export default function BugsPage() {
  const bugs = [
    {
      id: "b-1",
      key: "BUG-104",
      title:
        "Telebirr webhook drops callback when transaction exceeds 10,000 ETB",
      severity: "BLOCKER",
      priority: "CRITICAL",
      status: "OPEN",
      linkedTestCase: "TC-PAY-021",
      linkedRun: "RUN #24",
      assignee: "Bonsa Tesfaye",
    },
    {
      id: "b-2",
      key: "BUG-102",
      title: "Checkout page unresponsive when discount coupon exceeds subtotal",
      severity: "MAJOR",
      priority: "HIGH",
      status: "IN_PROGRESS",
      linkedTestCase: "TC-CHK-014",
      linkedRun: "RUN #22",
      assignee: "Sarah Jenkins",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Bug className="h-6 w-6 text-rose-600" />
            Bug Tracker & Traceability
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain bidirectional traceability between defect tickets, test
            cases, and execution logs
          </p>
        </div>
        <CreateBugDialog />
      </div>

      <div className="space-y-3">
        {bugs.map((b) => (
          <Link key={b.id} href={`/bugs/${b.key}`}>
            <Card className="border shadow-sm hover:border-rose-500/50 hover:shadow-md transition-all">
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-rose-600 dark:text-rose-400">
                      {b.key}
                    </span>
                    <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                      {b.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-blue-600 font-mono">
                      <Link2 className="h-3 w-3" /> {b.linkedTestCase}
                    </span>
                    <span>•</span>
                    <span>{b.linkedRun}</span>
                    <span>•</span>
                    <span>Assignee: {b.assignee}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant="destructive"
                    className="text-[10px] uppercase font-bold"
                  >
                    {b.severity}
                  </Badge>
                  <Badge variant="secondary" className="text-[10px] uppercase">
                    {b.priority}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase font-semibold"
                  >
                    {b.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
