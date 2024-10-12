import Image from "next/image";

export default function VisiDanMisi() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src="/assets/smk.png"
          alt="Picture of the author"
          layout="fill"
          objectFit="cover"
          className="blur-sm"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-7xl font-bold text-white">
          Visi, Misi, dan Tujuan
        </h1>
      </div>

      <div className="mb-8">
        <h1 className="mb-4 text-center text-2xl font-bold">Visi</h1>
        <p className="text-center text-lg leading-relaxed">
          Menjadi SMK Unggul dan Berdaya Saing di Tingkat Global tahun 2033
        </p>
      </div>

      <div>
        <h1 className="mb-4 text-center text-2xl font-bold">Misi</h1>
        <ol className="list-inside list-decimal space-y-4 text-lg leading-relaxed">
          <li>
            Mewujudkan pendidik dan tenaga kependidikan yang mampu memanfaatkan
            teknologi terkini dan professional.
          </li>
          <li>
            Mewujudkan proses pembelajaran yang berkualitas dan terintegrasi
            untuk membentuk karakter siswa.
          </li>
          <li>
            Menumbuhkan lingkungan belajar yang kreatif dan inovatif bagi siswa.
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
  );
}
