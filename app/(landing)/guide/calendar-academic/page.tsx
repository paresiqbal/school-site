import Image from "next/image";

export default function CalendarAcademic() {
  return (
    <div className="container mx-auto mb-8 flex max-w-[1200px] flex-col px-4 pt-6 md:px-0 md:pt-12">
      <div className="pb-2">
        <h1 className="mb-2 text-3xl font-bold underline decoration-rose-500 underline-offset-8 md:mb-6 md:text-5xl">
          Kalender Akademik
        </h1>
      </div>

      <Image
        src="/assets/kalender.jpg"
        width={1800}
        height={1500}
        quality={100}
        priority
        alt="Kalender Akademik"
      />
    </div>
  );
}
