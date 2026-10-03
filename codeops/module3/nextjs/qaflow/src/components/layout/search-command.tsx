"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  FolderKanban,
  FileCode2,
  PlaySquare,
  Bug,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchResult {
  id: string;
  category: "Projects" | "Test Cases" | "Test Runs" | "Bugs";
  title: string;
  key: string;
  href: string;
  badge?: string;
}

const SEARCH_ITEMS: SearchResult[] = [
  {
    id: "p1",
    category: "Projects",
    title: "E-Commerce Platform",
    key: "ECOM",
    href: "/projects",
    badge: "ACTIVE",
  },
  {
    id: "p2",
    category: "Projects",
    title: "Banking Portal",
    key: "BANK",
    href: "/projects",
    badge: "ACTIVE",
  },
  {
    id: "p3",
    category: "Projects",
    title: "Pharmacy Management System",
    key: "PHARM",
    href: "/projects",
    badge: "ACTIVE",
  },
  {
    id: "tc1",
    category: "Test Cases",
    title: "Login with valid email and password",
    key: "TC-AUTH-001",
    href: "/test-cases",
    badge: "SMOKE",
  },
  {
    id: "tc2",
    category: "Test Cases",
    title: "MFA code verification timeout",
    key: "TC-AUTH-002",
    href: "/test-cases",
    badge: "SECURITY",
  },
  {
    id: "tc3",
    category: "Test Cases",
    title: "Payment transaction via Telebirr gateway",
    key: "TC-PAY-021",
    href: "/test-cases",
    badge: "CRITICAL",
  },
  {
    id: "tr1",
    category: "Test Runs",
    title: "Sprint 42 - Regression Test Run",
    key: "RUN-24",
    href: "/test-runs",
    badge: "COMPLETED",
  },
  {
    id: "b1",
    category: "Bugs",
    title:
      "Telebirr webhook drops callback when transaction exceeds 10,000 ETB",
    key: "BUG-104",
    href: "/bugs",
    badge: "BLOCKER",
  },
];

export function SearchCommand() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filtered = SEARCH_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.key.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between w-48 sm:w-64 h-9 px-3 text-xs rounded-lg border bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span>Search artifacts...</span>
        </span>
        <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium rounded border bg-white dark:bg-slate-800 text-slate-500">
          ⌘K
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in-50">
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-xl rounded-xl border bg-white dark:bg-slate-900 shadow-2xl overflow-hidden z-50">
            <div className="flex items-center px-3 border-b">
              <Search className="h-4 w-4 text-slate-400 shrink-0 mr-2" />
              <input
                type="text"
                autoFocus
                placeholder="Search projects, test cases, test runs, bugs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-12 bg-transparent text-sm focus:outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No artifacts match your query &quot;{query}&quot;
                </div>
              ) : (
                <div className="space-y-1">
                  {filtered.map((item) => {
                    const Icon =
                      item.category === "Projects"
                        ? FolderKanban
                        : item.category === "Test Cases"
                          ? FileCode2
                          : item.category === "Test Runs"
                            ? PlaySquare
                            : Bug;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelect(item.href)}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <Icon className="h-4 w-4 text-slate-400 group-hover:text-blue-600 shrink-0" />
                          <div className="truncate">
                            <span className="font-mono font-bold text-slate-900 dark:text-slate-100 mr-2">
                              {item.key}
                            </span>
                            <span className="text-slate-600 dark:text-slate-300">
                              {item.title}
                            </span>
                          </div>
                        </div>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="text-[10px] uppercase shrink-0"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-2.5 border-t bg-slate-50 dark:bg-slate-950/40 text-[11px] text-slate-500 flex items-center justify-between">
              <span>
                Press <b>ESC</b> to close
              </span>
              <span>Use arrows to navigate</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
