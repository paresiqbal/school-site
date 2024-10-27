export default function Loading() {
  return (
    <div className="container mx-auto min-h-screen p-4">
      <div className="hidden space-x-2 pb-4 md:flex">
        <div className="h-4 w-20 animate-pulse rounded-md bg-muted-foreground/40"></div>
        <span className="text-muted-foreground">/</span>
        <div className="h-4 w-24 animate-pulse rounded-md bg-muted-foreground/40"></div>
      </div>

      <div className="animate-pulse rounded-lg bg-muted-foreground/40 p-6 shadow">
        <div className="mb-4">
          <div className="mb-2 h-6 w-40 rounded-md bg-zinc-500"></div>
          <div className="h-4 w-64 rounded-md bg-zinc-500"></div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="mb-2 h-4 w-20 rounded-md bg-zinc-500"></div>
            <div className="h-10 w-full rounded-lg bg-zinc-500"></div>
          </div>

          <div>
            <div className="mb-2 h-4 w-24 rounded-md bg-zinc-500"></div>
            <div className="h-24 w-full rounded-lg bg-zinc-500"></div>
          </div>

          <div className="relative">
            <div className="h-10 w-full rounded-lg bg-zinc-500"></div>
          </div>
        </div>

        <div className="mt-4">
          <div className="h-10 w-full rounded-lg bg-zinc-500"></div>
        </div>
      </div>
    </div>
  );
}
