export default function GoalsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-muted rounded-lg" />
          <div className="h-4 w-72 bg-muted/60 rounded-md" />
        </div>
        <div className="h-9 w-28 bg-muted rounded-xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <div className="h-5 w-48 bg-muted rounded-md" />
                <div className="h-4 w-24 bg-muted/60 rounded-md" />
              </div>
              <div className="h-8 w-16 bg-muted rounded-lg" />
            </div>
            <div className="h-10 bg-muted/30 rounded-lg" />
            <div className="space-y-2 pt-2">
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-muted rounded-md" />
                <div className="h-4 w-24 bg-muted rounded-md" />
              </div>
              <div className="h-3 w-full bg-muted/50 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
