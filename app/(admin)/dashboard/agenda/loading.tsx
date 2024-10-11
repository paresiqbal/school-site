export default function LoadingAgenda() {
  return (
    <div className="container mx-auto">
      <div className="hidden space-x-2 pb-4 md:flex">
        <div className="h-4 w-20 animate-pulse rounded-md bg-muted-foreground/40"></div>
        <span className="text-muted-foreground">/</span>
        <div className="h-4 w-24 animate-pulse rounded-md bg-muted-foreground/40"></div>
      </div>

      <div className="space-y-4">
        <div className="mb-4 flex animate-pulse flex-col rounded-lg bg-muted-foreground/40 p-4 shadow md:flex-row md:items-center">
          <div className="w-full md:w-3/4">
            <div className="mb-4">
              <div className="mb-2 h-6 w-40 rounded-md bg-zinc-500"></div>

              <div className="h-4 w-full rounded-md bg-zinc-500"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-3/4 rounded-md bg-zinc-500"></div>
              <div className="h-4 w-2/3 rounded-md bg-zinc-500"></div>
            </div>
          </div>

          <div className="mt-4 md:ml-4 md:mt-0">
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div className="h-4 w-8 rounded-md bg-zinc-500"></div>
              <div className="h-4 w-16 rounded-md bg-zinc-500"></div>
              <div className="h-4 w-16 rounded-md bg-zinc-500"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 h-10 w-32 animate-pulse rounded-md bg-zinc-500"></div>
    </div>
  );
}
