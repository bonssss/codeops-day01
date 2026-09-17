export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent mb-4"></div>
      <p className="text-zinc-600 dark:text-zinc-400 font-medium">
        Loading delicious dishes... please wait 🍲
      </p>
    </div>
  );
}