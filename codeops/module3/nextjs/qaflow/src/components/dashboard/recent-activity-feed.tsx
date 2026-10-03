import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaySquare, Bug, FileCode2, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: "TEST_EXECUTION" | "BUG_CREATED" | "TEST_CASE_UPDATED";
}

interface RecentActivityFeedProps {
  activities: ActivityItem[];
}

export function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
  return (
    <Card className="border shadow-sm col-span-1">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Recent QA Activity
          </CardTitle>
          <Clock className="h-4 w-4 text-slate-400" />
        </div>
        <CardDescription className="text-xs">
          Real-time event stream across test runs and bugs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((a) => {
          const Icon =
            a.type === "TEST_EXECUTION"
              ? PlaySquare
              : a.type === "BUG_CREATED"
                ? Bug
                : FileCode2;

          const iconColor =
            a.type === "TEST_EXECUTION"
              ? "text-blue-600 bg-blue-50 dark:bg-blue-950/50"
              : a.type === "BUG_CREATED"
                ? "text-rose-600 bg-rose-50 dark:bg-rose-950/50"
                : "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50";

          return (
            <div key={a.id} className="flex items-start gap-3 text-xs">
              <div className={`p-2 rounded-lg ${iconColor} shrink-0`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-800 dark:text-slate-200 leading-snug">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {a.user}
                  </span>{" "}
                  <span className="text-slate-500">{a.action}</span>{" "}
                  <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                    {a.target}
                  </span>
                </p>
                <span className="text-[10px] text-slate-400">{a.time}</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
