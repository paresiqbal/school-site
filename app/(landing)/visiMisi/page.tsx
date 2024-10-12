export default function VisiDanMisi() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Visi Section */}
      <div className="mb-8">
        <h1 className="mb-4 text-center text-2xl font-bold">Visi</h1>
        <p className="text-center text-lg leading-relaxed">
          Menjadi SMK Unggul dan Berdaya Saing di Tingkat Global tahun 2033
        </p>
      </div>

      {/* Misi Section */}
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
