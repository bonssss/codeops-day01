"use client";

import * as React from "react";
import { Sidebar } from "./sidebar";
import { X } from "lucide-react";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
  userName?: string;
}

export function MobileSidebar({
  isOpen,
  onClose,
  userRole,
  userName,
}: MobileSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-slate-900 z-50 shadow-2xl animate-in slide-in-from-left duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 z-50"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>

        <Sidebar userRole={userRole} userName={userName} onNavigate={onClose} />
      </div>
    </div>
  );
}
