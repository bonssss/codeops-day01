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
          dark: "#1C1917",
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
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-sm text-center sm:text-center p-5 sm:p-6">
        <DialogHeader className="text-center items-center mb-2">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary mb-1.5 shadow-sm">
            <QrIcon className="h-5 w-5" />
          </div>
          <DialogTitle className="text-lg font-bold">Scan to Tip {creatorName}</DialogTitle>
          <DialogDescription className="text-xs">
            Scan with your mobile camera or banking app to open page.
          </DialogDescription>
        </DialogHeader>

        <div className="my-3 flex flex-col items-center justify-center">
          <div className="rounded-2xl bg-white p-3 shadow-md border-2 border-primary/20">
            {dataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dataUrl} alt={`QR Code for ${creatorName}`} className="h-44 w-44 sm:h-48 sm:w-48 rounded-lg" />
            ) : (
              <div className="h-44 w-44 sm:h-48 sm:w-48 animate-pulse bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-xs">
                Generating QR...
              </div>
            )}
          </div>
          <div className="mt-2.5 text-[11px] font-mono text-muted-foreground max-w-[260px] truncate bg-muted px-2.5 py-1 rounded-lg border border-border">
            {url}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={!dataUrl}
            className="w-full text-xs"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Download PNG
          </Button>
          <CopyButton text={url} label="Copy Link" size="sm" className="w-full text-xs" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
