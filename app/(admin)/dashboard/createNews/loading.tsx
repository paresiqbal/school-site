export default function Loading() {
  return (
    <div className="container mx-auto min-h-screen p-4">
      <div className="hidden md:flex pb-4 space-x-2">
        <div className="w-20 h-4 bg-muted-foreground/40 rounded-md animate-pulse"></div>
        <span className="text-muted-foreground">/</span>
        <div className="w-24 h-4 bg-muted-foreground/40 rounded-md animate-pulse"></div>
      </div>

      <div className="bg-muted-foreground/40 rounded-lg shadow p-6 animate-pulse">
        <div className="mb-4">
          <div className="w-40 h-6 bg-zinc-500 rounded-md mb-2"></div>
          <div className="w-64 h-4 bg-zinc-500 rounded-md"></div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="w-20 h-4 bg-zinc-500 rounded-md mb-2"></div>
            <div className="w-full h-10 bg-zinc-500 rounded-lg"></div>
          </div>

          <div>
            <div className="w-24 h-4 bg-zinc-500 rounded-md mb-2"></div>
            <div className="w-full h-24 bg-zinc-500 rounded-lg"></div>
          </div>

          <div className="relative">
            <div className="w-full h-10 bg-zinc-500 rounded-lg"></div>
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full h-10 bg-zinc-500 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
