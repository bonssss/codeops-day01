"use client";

import * as React from "react";
import QRCode from "qrcode";
import { Download, QrCode as QrIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CopyButton } from "./copy-button";

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  creatorName: string;
  username: string;
}

export function QRCodeDialog({
  open,
  onOpenChange,
  url,
  creatorName,
  username,
}: QRCodeDialogProps) {
  const [dataUrl, setDataUrl] = React.useState<string>("");

  React.useEffect(() => {
    if (open && url) {
      QRCode.toDataURL(url, {
        width: 320,
        margin: 2,
        color: {
          dark: "#0a0a0c",
          light: "#ffffff",
        },
      })
        .then((res) => setDataUrl(res))
        .catch((err) => console.error("QR Code error:", err));
    }
  }, [open, url]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `tipjar-${username}-qr.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-md text-center sm:text-center">
        <DialogHeader className="text-center items-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 mb-2">
            <QrIcon className="h-6 w-6" />
          </div>
          <DialogTitle className="text-xl">Scan to Tip {creatorName}</DialogTitle>
          <DialogDescription>
            Share this QR code on your live streams, YouTube videos, posters, or business cards.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6 flex flex-col items-center justify-center">
          <div className="rounded-2xl bg-white p-4 shadow-2xl border-4 border-amber-500/30">
            {dataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dataUrl} alt={`QR Code for ${creatorName}`} className="h-60 w-60 rounded-lg" />
            ) : (
              <div className="h-60 w-60 animate-pulse bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-500 text-sm">
                Generating QR...
              </div>
            )}
          </div>
          <div className="mt-4 text-xs font-mono text-neutral-400 max-w-[280px] truncate bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
            {url}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleDownload}
            disabled={!dataUrl}
            className="w-full"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PNG
          </Button>
          <CopyButton text={url} label="Copy Link" className="w-full" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
