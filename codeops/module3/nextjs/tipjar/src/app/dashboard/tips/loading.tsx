export default function TipsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <div className="space-y-2">
          <div className="h-7 w-36 bg-muted rounded-lg" />
          <div className="h-4 w-60 bg-muted/60 rounded-md" />
        </div>
        <div className="h-9 w-24 bg-muted rounded-xl" />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
        <div className="flex gap-3">
          <div className="h-10 flex-1 bg-muted/50 rounded-xl" />
          <div className="h-10 w-32 bg-muted/50 rounded-xl" />
        </div>

        <div className="space-y-3 pt-2">
          {[1, 2, 3, 5, 6].map((i) => (
            <div key={i} className="h-14 bg-muted/30 rounded-xl border border-border/50" />
          ))}
        </div>
      </div>
    </div>
  );
}
