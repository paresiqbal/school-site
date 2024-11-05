export default function SchoolHistory() {
  const timelineEvents = [
    { year: 1950, event: "Sekolah didirikan" },
    { year: 1965, event: "Kelas kelulusan pertama" },
    { year: 1980, event: "Gedung sains baru dibuka" },
    { year: 1995, event: "Perayaan ulang tahun keseratus" },
    { year: 2010, event: "Renovasi kampus besar" },
    { year: 2020, event: "Peluncuran program pembelajaran daring" },
  ];

  return (
    <div className="mx-auto mt-4 flex max-w-[1200px] flex-col pt-6 dark:text-gray-300 md:items-center md:justify-center md:pt-12">
      <div className="space-y-2 pb-8 text-center">
        <h1 className="mb-2 text-balance text-4xl font-bold md:mb-6 md:text-5xl">
          SEJARAH
        </h1>
        <p className="text-md mb-12 text-muted-foreground md:text-lg">
          Sejarah SMKN 1 Rejang Lebong
        </p>
      </div>

      <div className="space-y-4">
        <div className="my-8">
          <h2 className="mb-8 text-center text-2xl font-semibold underline decoration-primary underline-offset-8 md:text-4xl">
            Tentang Sekolah
          </h2>
          <p className="text-xl text-gray-700 dark:text-white">
            <span className="font-semibold text-primary">
              SMK Negeri 1 Rejang Lebong
            </span>{" "}
            telah menjadi pilar keunggulan pendidikan selama lebih dari tujuh
            dekade. Didirikan pada tahun 1950, sekolah kami terus berkembang
            untuk memenuhi kebutuhan siswa yang terus berubah sambil
            mempertahankan nilai-nilai inti kami, yaitu integritas, inovasi, dan
            komunitas.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="mb-8 text-center text-2xl font-semibold underline decoration-primary underline-offset-8 md:text-4xl">
            Sejarah
          </h2>
          <div className="relative border-l-2 border-gray-300 pl-6">
            {timelineEvents.map((event, index) => (
              <div key={index} className="mb-8 flex items-start">
                <div className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full bg-primary"></div>
                <div>
                  <span className="font-semibol text-sm">{event.year}</span>
                  <p className="text-md">{event.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 py-8 dark:text-white md:grid-cols-3">
        <div className="flex flex-col rounded-md border-2 border-black bg-primary p-4 hover:shadow-card dark:border-white dark:hover:shadow-card lg:w-72">
          <h3 className="text-2xl font-bold">Siswa</h3>
          <p className="mt-2 text-4xl font-bold">200+</p>
          <p className="text-sm">Terdaftar setiap tahun</p>
        </div>
        <div className="flex flex-col rounded-md border-2 border-black bg-primary p-4 hover:shadow-card dark:border-white dark:hover:shadow-card">
          <h3 className="text-2xl font-bold">Jurusan</h3>
          <p className="mt-2 text-4xl font-bold">7</p>
          <p className="text-sm">Pendidik yang berdedikasi</p>
        </div>
        <div className="flex flex-col rounded-md border-2 border-black bg-primary p-4 hover:shadow-card dark:border-white dark:hover:shadow-card">
          <h3 className="text-2xl font-bold">Alumi</h3>
          <p className="mt-2 text-4xl font-bold">5,000+</p>
          <p className="text-sm">Lulusan terbaik</p>
        </div>
      </div>
    </div>
  );
}
