"use client";

import * as React from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { logoutUser } from "@/actions/auth";
import { LogOut, User, Shield } from "lucide-react";

interface UserMenuProps {
  name?: string;
  email?: string;
  role?: string;
  image?: string | null;
}

export function UserMenu({
  name = "Bonsa Tesfaye",
  email = "engineer@qaflow.dev",
  role = "QA_ENGINEER",
  image,
}: UserMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);

  const handleLogout = async () => {
    setIsPending(true);
    await logoutUser();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1 rounded-full hover:ring-2 hover:ring-blue-600/30 transition-all"
        aria-label="User profile menu"
      >
        <Avatar src={image} fallback={name} className="h-8 w-8" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white dark:bg-slate-900 shadow-xl z-50 overflow-hidden animate-in fade-in-50 zoom-in-95">
            <div className="p-3 border-b bg-slate-50/70 dark:bg-slate-950/40">
              <p className="font-semibold text-xs text-slate-900 dark:text-slate-100 truncate">
                {name}
              </p>
              <p className="text-[11px] text-slate-500 truncate mb-1.5">
                {email}
              </p>
              <Badge
                variant="pass"
                className="text-[9px] px-1.5 py-0 uppercase"
              >
                {role.replace("QA_", "")}
              </Badge>
            </div>

            <div className="p-1 text-xs">
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <User className="h-3.5 w-3.5 text-slate-400" />
                <span>Profile Settings</span>
              </Link>
              <Link
                href="/team"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Shield className="h-3.5 w-3.5 text-slate-400" />
                <span>Team & Roles</span>
              </Link>
            </div>

            <div className="p-1 border-t">
              <button
                type="button"
                onClick={handleLogout}
                disabled={isPending}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>{isPending ? "Signing out..." : "Sign Out"}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
