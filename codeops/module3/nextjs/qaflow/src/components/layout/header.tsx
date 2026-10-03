"use client";

import * as React from "react";
import { SearchCommand } from "./search-command";
import { NotificationsPopover } from "./notifications-popover";
import { UserMenu } from "./user-menu";
import { Menu } from "lucide-react";

interface HeaderProps {
  userName?: string;
  userEmail?: string;
  userRole?: string;
  userImage?: string | null;
  onMobileMenuToggle: () => void;
}

export function Header({
  userName,
  userEmail,
  userRole,
  userImage,
  onMobileMenuToggle,
}: HeaderProps) {
  return (
    <header className="h-16 border-b bg-white dark:bg-slate-900 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile Drawer Trigger & Workspace Indicator */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="lg:hidden h-9 w-9 rounded-lg border flex items-center justify-center text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-900 dark:text-slate-200">
            Default Workspace
          </span>
          <span>/</span>
          <span className="font-mono text-blue-600 dark:text-blue-400">
            QAFlow Platform
          </span>
        </div>
      </div>

      {/* Right: Search + Notifications + User Avatar Menu */}
      <div className="flex items-center gap-3">
        <SearchCommand />
        <NotificationsPopover />
        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />
        <UserMenu
          name={userName}
          email={userEmail}
          role={userRole}
          image={userImage}
        />
      </div>
    </header>
  );
}
