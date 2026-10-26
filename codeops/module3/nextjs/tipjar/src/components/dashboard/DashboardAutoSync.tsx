"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { syncPendingTransactionsAction } from "@/actions/tips";

/**
 * Background auto-sync component embedded in the Dashboard layout.
 * Automatically checks and syncs pending Chapa transactions:
 * 1. Immediately on page mount
 * 2. Whenever the browser tab regains focus or visibility
 * 3. On a 6-second background heartbeat if pending items are detected
 */
export function DashboardAutoSync() {
  const router = useRouter();
  const lastSyncRef = React.useRef<number>(0);
  const isSyncingRef = React.useRef<boolean>(false);

  const performSync = React.useCallback(async () => {
    const now = Date.now();
    // Debounce to at most once every 3.5 seconds
    if (now - lastSyncRef.current < 3500 || isSyncingRef.current) {
      return;
    }

    isSyncingRef.current = true;
    lastSyncRef.current = now;

    try {
      const res = await syncPendingTransactionsAction();
      if (res.success && res.updatedCount > 0) {
        // Refresh server components across dashboard so balances, counts and charts update
        router.refresh();
      }
    } catch {
      // Ignore background transient network errors silently
    } finally {
      isSyncingRef.current = false;
    }
  }, [router]);

  React.useEffect(() => {
    // 1. Initial background sync on mount
    performSync();

    // 2. Sync on window focus (e.g. user returns from Chapa payment tab)
    const handleFocus = () => {
      performSync();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        performSync();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 3. Periodic background check every 6 seconds
    const interval = setInterval(() => {
      performSync();
    }, 6000);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(interval);
    };
  }, [performSync]);

  return null;
}
