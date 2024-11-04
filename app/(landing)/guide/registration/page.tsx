import Image from "next/image";

export default function Registration() {
  const isRegistrationOpen = false;

  return (
    <div className="container mx-auto mb-8 flex max-w-[1200px] flex-col px-4 pt-6 md:px-0 md:pt-12">
      <div className="pb-2">
        <h1 className="mb-2 text-3xl font-bold underline decoration-rose-500 underline-offset-8 md:mb-6 md:text-5xl">
          Pendaftaran
        </h1>
      </div>
      {isRegistrationOpen ? (
        <div>
          <Image src="/Next.js.png" width={500} height={500} alt="display" />
          {/* Form or registration details go here */}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center py-4 text-center">
          <p className="text-xl font-semibold text-gray-700 md:text-2xl">
            Pendaftaran belum dibuka ya
          </p>
          <p className="mt-2 text-gray-500">
            Harap kembali lagi nanti untuk informasi lebih lanjut.
          </p>
        </div>
      )}
    </div>
  );
}
