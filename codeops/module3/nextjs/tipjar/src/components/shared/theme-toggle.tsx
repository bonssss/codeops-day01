"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "default" | "sm" | "icon";
}) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size={size === "icon" ? "icon" : "sm"}
        className={className}
        disabled
      >
        <span className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      size={size === "icon" ? "icon" : "sm"}
      onClick={toggleTheme}
      className={className}
      title={resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4 text-amber-500" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700" />
      )}
    </Button>
  );
}
