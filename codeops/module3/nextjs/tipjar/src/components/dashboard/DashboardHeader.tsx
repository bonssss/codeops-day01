"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink, QrCode as QrIcon, Share2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/copy-button";
import { QRCodeDialog } from "@/components/shared/qr-code-dialog";

interface HeaderProps {
  user: {
    name: string;
    username: string | null;
  };
  title: string;
  description?: string;
}

export function DashboardHeader({ user, title, description }: HeaderProps) {
  const [qrOpen, setQrOpen] = React.useState(false);
  const publicUrl = typeof window !== "undefined" && user.username
    ? `${window.location.origin}/tip/${user.username}`
    : `https://tipjar.io/tip/${user.username || "creator"}`;

  return (
    <div className="border-b border-white/5 bg-neutral-950/40 backdrop-blur-md px-6 py-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">{title}</h1>
          {description && <p className="text-xs text-neutral-400 mt-0.5">{description}</p>}
        </div>

        {user.username && (
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQrOpen(true)}
              className="gap-1.5"
            >
              <QrIcon className="h-4 w-4 text-amber-400" />
              <span className="hidden sm:inline">My QR Code</span>
            </Button>

            <CopyButton text={publicUrl} label="Copy Tip Link" variant="outline" size="sm" />

            <Link href={`/tip/${user.username}`} target="_blank">
              <Button variant="default" size="sm" className="gap-1.5 shadow-amber-500/15">
                <span>Live Page</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Link>

            <QRCodeDialog
              open={qrOpen}
              onOpenChange={setQrOpen}
              url={publicUrl}
              creatorName={user.name}
              username={user.username}
            />
          </div>
        )}
      </div>
    </div>
  );
}
