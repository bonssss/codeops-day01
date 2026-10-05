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
  ExternalLink,
  LogOut,
} from "lucide-react";
import { logoutAction } from "@/actions/auth";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { TiplyLogo } from "@/components/shared/tiply-logo";

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
    <aside className="w-64 border-r border-border bg-card flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Logo & ThemeToggle */}
        <div className="h-18 px-6 flex items-center justify-between border-b border-border">
          <Link href="/">
            <TiplyLogo size="md" />
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
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer User Info & Tipping Link */}
      <div className="p-4 border-t border-border space-y-3">
        {user.username && (
          <Link
            href={`/tip/${user.username}`}
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-muted border border-border text-emerald-700 dark:text-emerald-400 hover:bg-border text-xs font-semibold transition-colors"
          >
            <span className="truncate">View Public Page</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
          </Link>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-xs text-emerald-700 dark:text-emerald-400 shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="truncate text-xs">
              <div className="font-semibold text-foreground truncate">{user.name}</div>
              <div className="text-muted-foreground truncate">@{user.username || "creator"}</div>
            </div>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              title="Sign Out"
              className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-muted transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
