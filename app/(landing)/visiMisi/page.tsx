import Image from "next/image";

export default function VisiDanMisi() {
  return (
    <div className="container mx-auto px-4 md:px-20">
      {/* Image Section */}
      <div className="relative -mx-40 h-40 w-[calc(100%+20rem)] overflow-hidden">
        <Image
          src="/assets/smk.png"
          alt="Picture of the author"
          layout="fill"
          objectFit="cover"
          className="blur-sm"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-5xl font-bold shadow-lg">
          Visi, Misi, dan Tujuan
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="pt-20">
        {/* Vision Section */}
        <div className="mb-8 rounded-lg p-8 shadow-lg">
          <h2 className="mb-4 text-center text-5xl font-bold underline underline-offset-8 md:text-7xl">
            Visi
          </h2>
          <p className="text-xl leading-relaxed text-gray-800 md:text-3xl">
            Menjadi pusat pendidikan vokasi terkemuka yang membentuk profesional
            unggul dan siap bersaing di tingkat global.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-8 rounded-lg p-8 shadow-lg">
          <h2 className="mb-4 text-center text-5xl font-bold underline underline-offset-8 md:text-7xl">
            Misi
          </h2>
          <ol className="list-inside list-decimal space-y-4 text-lg leading-relaxed text-gray-800 md:text-2xl">
            <li>
              Mewujudkan pendidik dan tenaga kependidikan yang mampu
              memanfaatkan teknologi terkini dan profesional.
            </li>
            <li>
              Mewujudkan proses pembelajaran yang berkualitas dan terintegrasi
              untuk membentuk karakter siswa.
            </li>
            <li>
              Menumbuhkan lingkungan belajar yang kreatif dan inovatif bagi
              siswa.
            </li>
            <li>
              Mewujudkan sarana prasarana berstandar industri dan berwawasan
              lingkungan.
            </li>
            <li>
              Mengembangkan kerjasama yang luas dan bermakna dengan dunia kerja
              nasional dan internasional.
            </li>
          </ol>
        </div>

        {/* Goals Section */}
        <div className="mb-8 rounded-lg p-8 shadow-lg">
          <h2 className="mb-4 text-center text-5xl font-bold underline underline-offset-8 md:text-7xl">
            Tujuan
          </h2>
          <ol className="list-inside list-decimal space-y-4 text-lg leading-relaxed text-gray-800 md:text-2xl">
            <li>
              Mewujudkan pendidik dan tenaga kependidikan yang mampu
              memanfaatkan teknologi terkini dan profesional.
            </li>
            <li>
              Mewujudkan proses pembelajaran yang berkualitas dan terintegrasi
              untuk membentuk karakter siswa.
            </li>
            <li>
              Menumbuhkan lingkungan belajar yang kreatif dan inovatif bagi
              siswa.
            </li>
            <li>
              Mewujudkan sarana prasarana berstandar industri dan berwawasan
              lingkungan.
            </li>
            <li>
              Mengembangkan kerjasama yang luas dan bermakna dengan dunia kerja
              nasional dan internasional.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
