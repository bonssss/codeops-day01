import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            Quality Analytics & Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Exportable execution summaries, test pass trends, and tester
            activity velocity
          </p>
        </div>
        <Button size="sm" variant="outline" className="text-xs">
          <Download className="h-3.5 w-3.5 mr-1" />
          Export PDF / CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold">
              Release Pass Rate Trend
            </CardTitle>
            <CardDescription className="text-xs">
              Comparing pass rates across Sprint 40, 41, and 42 release
              candidates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-900">
              <span className="font-semibold">Sprint 42 (Current)</span>
              <Badge variant="pass">79.2% Pass Rate</Badge>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-900">
              <span className="font-semibold">Sprint 41</span>
              <Badge variant="pass">88.5% Pass Rate</Badge>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-900">
              <span className="font-semibold">Sprint 40</span>
              <Badge variant="pass">92.0% Pass Rate</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold">
              Execution Velocity by Tester
            </CardTitle>
            <CardDescription className="text-xs">
              Neutral activity volume for Sprint 42
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-900">
              <span className="font-semibold">Bonsa Tesfaye (Senior SDET)</span>
              <span>48 tests executed</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-900">
              <span className="font-semibold">John Doe (QA Engineer)</span>
              <span>32 tests executed</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-900">
              <span className="font-semibold">Sarah Jenkins (QA Manager)</span>
              <span>18 tests executed</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
