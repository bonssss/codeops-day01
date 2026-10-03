import { Coffee } from "lucide-react";

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center mb-4">
        <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 animate-pulse flex items-center justify-center text-amber-500">
          <Coffee className="h-8 w-8 animate-bounce" />
        </div>
      </div>
      <div className="space-y-2 text-center">
        <div className="h-4 w-28 bg-muted rounded-full animate-pulse mx-auto" />
        <div className="h-3 w-40 bg-muted/60 rounded-full animate-pulse mx-auto" />
      </div>
    </div>
  );
}
