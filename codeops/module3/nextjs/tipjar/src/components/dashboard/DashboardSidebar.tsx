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
    <aside className="w-64 border-r border-white/5 bg-neutral-950/80 backdrop-blur-xl flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Logo */}
        <div className="h-18 px-6 flex items-center gap-2.5 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-neutral-950 shadow-md shadow-amber-500/20 font-black">
              <Coffee className="h-5 w-5" />
            </div>
            <span className="font-black text-xl tracking-tight text-white">
              Tip<span className="gradient-text">Jar</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-neutral-950" : "text-neutral-400")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer User Info & Tipping Link */}
      <div className="p-4 border-t border-white/5 space-y-3">
        {user.username && (
          <Link
            href={`/tip/${user.username}`}
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 text-xs font-semibold transition-colors"
          >
            <span className="truncate">View Public Page</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
          </Link>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-8 w-8 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center font-bold text-xs text-amber-400 shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="truncate text-xs">
              <div className="font-semibold text-white truncate">{user.name}</div>
              <div className="text-neutral-500 truncate">@{user.username || "creator"}</div>
            </div>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              title="Sign Out"
              className="p-2 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
