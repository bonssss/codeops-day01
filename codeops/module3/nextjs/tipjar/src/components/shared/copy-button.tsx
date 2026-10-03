"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

interface CopyButtonProps {
  text: string;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  label?: string;
}

export function CopyButton({
  text,
  className,
  variant = "outline",
  size = "sm",
  label = "Copy Link",
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const { toast } = useToast();

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Link copied to clipboard",
        type: "success",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        type: "error",
      });
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-400 mr-1.5" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 text-neutral-400 mr-1.5" />
          <span>{label}</span>
        </>
      )}
    </Button>
  );
}
