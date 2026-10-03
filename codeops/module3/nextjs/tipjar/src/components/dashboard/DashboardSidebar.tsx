"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Coins,
  Target,
  BarChart3,
  User,
  Settings,
  Coffee,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { logoutAction } from "@/actions/auth";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";

interface SidebarProps {
  user: {
    name: string;
    username: string | null;
    avatarUrl: string | null;
  };
}

export function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Tips", href: "/dashboard/tips", icon: Coins },
    { name: "Goals", href: "/dashboard/goals", icon: Target },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Logo & ThemeToggle */}
        <div className="h-18 px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-amber-600 dark:bg-amber-500 flex items-center justify-center text-white dark:text-slate-950 font-bold shadow-sm">
              <Coffee className="h-5 w-5" />
            </div>
            <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
              Tip<span className="text-amber-600 dark:text-amber-400">Jar</span>
            </span>
          </Link>
          <ThemeToggle size="icon" className="h-8 w-8" />
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white dark:text-slate-950" : "text-slate-400")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer User Info & Tipping Link */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
        {user.username && (
          <Link
            href={`/tip/${user.username}`}
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-950 text-xs font-semibold transition-colors"
          >
            <span className="truncate">View Public Page</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
          </Link>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold text-xs text-amber-600 dark:text-amber-400 shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="truncate text-xs">
              <div className="font-semibold text-slate-900 dark:text-white truncate">{user.name}</div>
              <div className="text-slate-500 dark:text-slate-400 truncate">@{user.username || "creator"}</div>
            </div>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              title="Sign Out"
              className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
