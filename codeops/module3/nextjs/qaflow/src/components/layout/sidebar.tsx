"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  FolderKanban,
  FileCode2,
  PlaySquare,
  Bug,
  BarChart3,
  Users,
  Settings,
  ShieldCheck,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
    badge: "3",
  },
  {
    title: "Test Cases",
    href: "/test-cases",
    icon: FileCode2,
  },
  {
    title: "Test Runs",
    href: "/test-runs",
    icon: PlaySquare,
    badge: "1 Live",
  },
  {
    title: "Bugs",
    href: "/bugs",
    icon: Bug,
    badge: "1 Blocker",
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
];

const SETTINGS_ITEMS: NavItem[] = [
  {
    title: "Team",
    href: "/team",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  userRole?: string;
  userName?: string;
  onNavigate?: () => void;
}

export function Sidebar({
  userRole = "QA_ENGINEER",
  userName = "Bonsa Tesfaye",
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white dark:bg-slate-900 flex flex-col justify-between h-full select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 border-b px-6 flex items-center justify-between">
          <Link
            href="/dashboard"
            onClick={onNavigate}
            className="flex items-center gap-2.5 font-bold text-lg tracking-tight"
          >
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
              Q
            </div>
            <span>QAFlow</span>
          </Link>
          <Badge
            variant="outline"
            className="text-[10px] font-mono font-medium px-1.5 py-0"
          >
            v1.0
          </Badge>
        </div>

        {/* Main Navigation */}
        <div className="p-3 space-y-6">
          <div>
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Core Platform
            </div>
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all group",
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-colors",
                          isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300",
                        )}
                      />
                      <span>{item.title}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={cn(
                          "text-[10px] font-semibold px-1.5 py-0.5 rounded",
                          item.badge.includes("Blocker")
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                            : item.badge.includes("Live")
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Management
            </div>
            <nav className="space-y-1">
              {SETTINGS_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group",
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors",
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300",
                      )}
                    />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* User Mini Footer */}
      <div className="p-4 border-t bg-slate-50/50 dark:bg-slate-950/30 flex items-center justify-between">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="h-8 w-8 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs uppercase shrink-0">
            {userName.slice(0, 2)}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold truncate text-slate-900 dark:text-slate-100">
              {userName}
            </p>
            <span className="text-[10px] text-slate-400 uppercase font-mono">
              {userRole.replace("QA_", "")}
            </span>
          </div>
        </div>
        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
      </div>
    </aside>
  );
}
