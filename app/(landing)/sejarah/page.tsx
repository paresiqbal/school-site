import Image from "next/image";

export default function Sejarah() {
  return (
    <div className="container mx-auto md:px-20">
      <div className="relative -mx-40 h-40 w-[calc(100%+20rem)] overflow-hidden">
        <Image
          src="/assets/smk.png"
          alt="Picture of the author"
          layout="fill"
          objectFit="cover"
          className="blur-sm"
        />
        <h1 className="md:text:4xl absolute inset-0 flex items-center justify-center text-3xl font-bold shadow-lg lg:text-5xl">
          Sejarah
        </h1>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-3xl font-semibold">Pendahuluan</h2>
        <p className="text-lg leading-relaxed">
          Sekolah XYZ didirikan pada tahun 2000 dengan tujuan untuk memberikan
          pendidikan berkualitas tinggi kepada siswa. Sejak awal, sekolah ini
          berkomitmen untuk menciptakan lingkungan belajar yang inovatif dan
          inklusif.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-3xl font-semibold">
          Tahun Pertama (2000-2005)
        </h2>
        <p className="text-lg leading-relaxed">
          Pada tahun 2000, Sekolah XYZ dibuka dengan hanya 50 siswa dan 5
          pengajar. Dalam periode lima tahun pertama, sekolah ini fokus pada
          pengembangan kurikulum yang adaptif dan metode pengajaran yang
          interaktif.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-3xl font-semibold">
          Perkembangan (2006-2015)
        </h2>
        <p className="text-lg leading-relaxed">
          Sekolah XYZ mengalami pertumbuhan yang signifikan, dengan jumlah siswa
          meningkat menjadi 300. Pada tahun 2010, sekolah ini meluncurkan
          program ekstrakurikuler yang beragam, termasuk olahraga, seni, dan
          sains, yang semakin menarik minat siswa.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-3xl font-semibold">
          Inovasi dan Prestasi (2016-2020)
        </h2>
        <p className="text-lg leading-relaxed">
          Dalam periode ini, Sekolah XYZ meraih berbagai penghargaan di tingkat
          regional dan nasional. Sekolah ini menjadi pionir dalam penggunaan
          teknologi pendidikan, mengintegrasikan perangkat digital dalam proses
          belajar mengajar.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-3xl font-semibold">
          Masa Kini (2021-Sekarang)
        </h2>
        <p className="text-lg leading-relaxed">
          Saat ini, Sekolah XYZ berkomitmen untuk terus meningkatkan kualitas
          pendidikan dan memperluas fasilitas. Dengan lebih dari 500 siswa dan
          staf yang berdedikasi, sekolah ini berfokus pada persiapan siswa untuk
          tantangan global melalui pendidikan berbasis karakter dan keterampilan
          abad ke-21.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-3xl font-semibold">Visi ke Depan</h2>
        <p className="text-lg leading-relaxed">
          Sekolah XYZ bertekad untuk menjadi pusat pendidikan vokasi terkemuka,
          terus berinovasi dalam metode pengajaran, dan menjalin kerjasama yang
          erat dengan industri untuk memastikan lulusan siap bersaing di tingkat
          global.
        </p>
      </div>
    </div>
  );
}
