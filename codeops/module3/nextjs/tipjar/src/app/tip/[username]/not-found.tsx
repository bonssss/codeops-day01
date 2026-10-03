import Link from "next/link";
import { Coffee, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TipNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
      <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6">
        <Coffee className="h-8 w-8" />
      </div>

      <h1 className="text-3xl font-extrabold text-foreground mb-2">Creator Page Not Found</h1>
      <p className="text-muted-foreground max-w-md mb-8 text-sm leading-relaxed">
        The creator handle you are looking for doesn&apos;t exist yet or may have been renamed.
      </p>

      <div className="flex gap-4">
        <Link href="/">
          <Button variant="default">Back to Home</Button>
        </Link>
        <Link href="/register">
          <Button variant="outline">Claim This Username</Button>
        </Link>
      </div>
    </div>
  );
}
