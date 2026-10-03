"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, Check, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: string;
  link?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
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
];

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS,
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-9 w-9 rounded-lg border flex items-center justify-center text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-600 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border bg-white dark:bg-slate-900 shadow-xl z-50 overflow-hidden animate-in fade-in-50 zoom-in-95">
            <div className="p-3 border-b flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/40">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="text-[10px] px-1.5 py-0"
                  >
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <Check className="h-3.5 w-3.5" />
                  Mark all read
                </button>
              )}
            </div>

            <div className="divide-y max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <Link
                  key={n.id}
                  href={n.link || "#"}
                  onClick={() => setIsOpen(false)}
                  className={`block p-3 text-left text-xs transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                    !n.read
                      ? "bg-blue-50/40 dark:bg-blue-950/20"
                      : "text-slate-500"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      {!n.read && (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                      )}
                      {n.title}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 line-clamp-2">
                    {n.message}
                  </p>
                </Link>
              ))}
            </div>

            <div className="p-2 border-t text-center bg-slate-50/50 dark:bg-slate-950/30">
              <Link
                href="/notifications"
                onClick={() => setIsOpen(false)}
                className="text-xs text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
              >
                View all notifications
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
