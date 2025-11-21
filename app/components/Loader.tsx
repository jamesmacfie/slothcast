export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        {/* Spinning ring */}
        <div className="absolute inset-0 border-4 border-zinc-200 dark:border-zinc-700 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" />
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm animate-pulse">
        Generating weather infographic...
      </p>
    </div>
  );
}
