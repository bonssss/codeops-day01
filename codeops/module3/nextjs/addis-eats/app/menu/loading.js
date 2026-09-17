export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4"></div>
      <p className="text-stone-600 font-semibold text-sm">
        Simmering dishes... please wait 🍲
      </p>
    </div>
  );
}