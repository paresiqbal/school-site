import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Berita() {
  return (
    <div className="container mx-auto mb-8 mt-4 flex max-w-[1200px] flex-col px-4 pt-6 md:px-0 md:pt-12">
      <div className="space-y-2 pb-8">
        <h1 className="mb-2 text-3xl font-bold md:mb-6 md:text-5xl">Berita</h1>
      </div>

      <div className="flex max-w-3xl flex-col gap-2 overflow-hidden md:flex-row md:gap-4">
        <div className="flex w-full flex-col items-start space-y-1 md:w-1/4 md:space-y-2">
          <span className="text-sm md:text-base">October 16, 2024</span>
          <span className="rounded-md bg-primary px-2 py-1 text-xs text-background md:text-sm">
            tags
          </span>
        </div>

        <div className="hidden md:block">
          <Separator
            orientation="vertical"
            className="h-full w-px bg-gray-400"
          />
        </div>

        <div className="flex w-full flex-col md:w-3/4">
          <div className="relative">
            <Image
              src="/Next.js.png"
              width={500}
              height={500}
              alt="How to convert CommonJS to ESM"
              className="h-40 w-full rounded-md object-cover md:h-48"
            />
            <span className="absolute bottom-2 right-2 rounded-md bg-primary bg-opacity-60 px-2 py-1 text-xs text-background md:text-sm">
              berita
            </span>
          </div>
          <div className="mt-4">
            <h2 className="mb-2 text-lg font-semibold md:text-xl">
              How to convert CommonJS to ESM
            </h2>
            <p className="text-sm italic md:text-base">
              Here is a thorough guide that covers everything you need to know
              to migrate your CommonJS project to ESM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
