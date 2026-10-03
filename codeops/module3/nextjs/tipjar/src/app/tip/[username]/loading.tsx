export default function TipPageLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20 animate-pulse">
      {/* Navbar Skeleton */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="h-8 w-28 bg-muted rounded-xl" />
          <div className="h-8 w-8 bg-muted rounded-xl" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Creator Profile Skeleton */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-muted" />
                <div className="space-y-2 flex-1">
                  <div className="h-6 w-36 bg-muted rounded-lg" />
                  <div className="h-4 w-24 bg-muted/60 rounded-md" />
                </div>
              </div>
              <div className="h-16 bg-muted/30 rounded-xl" />
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-sm">
              <div className="h-5 w-32 bg-muted rounded-md" />
              <div className="h-3 w-full bg-muted/50 rounded-full" />
            </div>
          </div>

          {/* Tipping Form Skeleton */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="h-7 w-40 bg-muted rounded-lg" />
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-11 bg-muted/50 rounded-xl" />
                ))}
              </div>
              <div className="h-12 bg-muted/30 rounded-xl" />
              <div className="h-24 bg-muted/30 rounded-xl" />
              <div className="h-12 bg-muted rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
