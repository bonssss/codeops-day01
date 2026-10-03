export default function AnalyticsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-muted rounded-lg" />
          <div className="h-4 w-72 bg-muted/60 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
          <div className="h-5 w-40 bg-muted rounded-md" />
          <div className="h-64 bg-muted/30 rounded-xl" />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
          <div className="h-5 w-40 bg-muted rounded-md" />
          <div className="h-64 bg-muted/30 rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
            <div className="h-5 w-36 bg-muted rounded-md" />
            <div className="h-52 bg-muted/30 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
