"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bell,
  Check,
  ExternalLink,
  FileCode2,
  Bug,
  PlaySquare,
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: string;
  link: string;
}

const ALL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n-1",
    title: "Test Case Assigned",
    message: "You were assigned TC-AUTH-001 by Sarah Jenkins.",
    time: "10m ago",
    read: false,
    type: "ASSIGNED_TEST_CASE",
    link: "/test-cases",
  },
  {
    id: "n-2",
    title: "Critical Bug Reported",
    message: "BUG-104 'Telebirr webhook drops callback' was opened.",
    time: "45m ago",
    read: false,
    type: "ASSIGNED_BUG",
    link: "/bugs",
  },
  {
    id: "n-3",
    title: "Test Run Completed",
    message: "Sprint 42 - Regression Test Run finished with 1 failure.",
    time: "2h ago",
    read: true,
    type: "TEST_RUN_COMPLETED",
    link: "/test-runs",
  },
  {
    id: "n-4",
    title: "Project Membership Updated",
    message:
      "You were granted QA_ENGINEER permissions on Banking Portal (BANK).",
    time: "1d ago",
    read: true,
    type: "PROJECT_INVITE",
    link: "/projects",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    React.useState<NotificationItem[]>(ALL_NOTIFICATIONS);
  const [filter, setFilter] = React.useState<"ALL" | "UNREAD">("ALL");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filtered = notifications.filter((n) =>
    filter === "UNREAD" ? !n.read : true,
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-600" />
            Notification Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time notifications for assigned test cases, defect tickets, and
            test runs
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={markAllRead}
              className="text-xs"
            >
              <Check className="h-3.5 w-3.5 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter("ALL")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filter === "ALL"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("UNREAD")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filter === "UNREAD"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      <div className="space-y-2.5">
        {filtered.map((n) => {
          const Icon =
            n.type === "ASSIGNED_TEST_CASE"
              ? FileCode2
              : n.type === "ASSIGNED_BUG"
                ? Bug
                : PlaySquare;

          return (
            <Card
              key={n.id}
              className={`border shadow-sm transition-all ${
                !n.read
                  ? "border-blue-200 dark:border-blue-900 bg-blue-50/30 dark:bg-blue-950/20"
                  : "border-slate-200 dark:border-slate-800"
              }`}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="h-9 w-9 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      {!n.read && (
                        <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                      )}
                      <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                        {n.title}
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        • {n.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {n.message}
                    </p>
                  </div>
                </div>

                <Link href={n.link}>
                  <Button size="sm" variant="ghost" className="text-xs">
                    View
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
