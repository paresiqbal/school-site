export default function loading() {
  return (
    <div className="container mx-auto min-h-screen p-4">
      <div className="hidden pb-4 md:flex">
        <div className="h-4 w-20 animate-pulse rounded-md bg-muted-foreground/40"></div>
        <span className="mx-2 text-muted-foreground">/</span>
        <div className="h-4 w-24 animate-pulse rounded-md bg-muted-foreground/40"></div>
      </div>

      <div className="mb-4 flex animate-pulse flex-col p-4 md:flex-row md:items-center">
        <div className="mb-4 w-full md:mb-0 md:mr-4 md:w-1/4">
          <div className="h-64 w-full rounded-lg bg-zinc-500"></div>
        </div>

        <div className="w-full md:w-3/4">
          <div className="mb-2">
            <div className="mb-2 h-6 w-48 rounded-md bg-zinc-500"></div>

            <div className="h-4 w-32 rounded-md bg-zinc-500"></div>
          </div>

          <div className="mb-4">
            <div className="h-20 w-full rounded-md bg-zinc-500"></div>
          </div>

          <div className="flex gap-4">
            <div className="h-10 w-24 rounded-md bg-zinc-500"></div>
            <div className="h-10 w-24 rounded-md bg-zinc-500"></div>
          </div>
        </div>
      </div>

      <div className="mt-4 h-10 w-36 animate-pulse rounded-md bg-zinc-500"></div>
    </div>
  );
}
