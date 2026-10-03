export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-border">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded-xl" />
          <div className="h-4 w-72 bg-muted/60 rounded-lg" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-28 bg-muted rounded-xl" />
          <div className="h-10 w-32 bg-muted rounded-xl" />
        </div>
      </div>

      {/* Metrics Row Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-2xl border border-border bg-card space-y-3 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="h-4 w-20 bg-muted rounded-md" />
              <div className="h-8 w-8 rounded-lg bg-muted" />
            </div>
            <div className="h-7 w-28 bg-muted rounded-lg" />
            <div className="h-3 w-36 bg-muted/60 rounded-md" />
          </div>
        ))}
      </div>

      {/* Chart and Activity Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card space-y-4 shadow-sm">
          <div className="h-5 w-40 bg-muted rounded-lg" />
          <div className="h-64 bg-muted/40 rounded-xl" />
        </div>
        <div className="p-6 rounded-2xl border border-border bg-card space-y-4 shadow-sm">
          <div className="h-5 w-32 bg-muted rounded-lg" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 bg-muted/40 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
