import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <div className="container mx-auto mb-8 flex max-w-[1200px] flex-col px-4 pt-6 md:px-0 md:pt-12">
      <div className="pb-2 text-center">
        <h1 className="mb-2 text-3xl font-bold underline decoration-blue-500 underline-offset-8 md:mb-6 md:text-5xl">
          FAQ
        </h1>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Kapan jadwal pendaftaran siswa baru dibuka?
          </AccordionTrigger>
          <AccordionContent>
            Jadwal pendaftaran siswa baru biasanya dibuka setiap tahun pada
            bulan Juni hingga Juli, tergantung kebijakan pemerintah daerah dan
            sekolah masing-masing. Untuk informasi terkini, cek situs resmi
            sekolah atau dinas pendidikan setempat.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Apa saja persyaratan masuk SMK 1 Rejang Lebong?
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              <li>1. Ijazah SMP atau MTs</li>
              <li>2. Surat keterangan lulus</li>
              <li>3. Akta kelahiran</li>
              <li>4. Kartu keluarga (KK)</li>
              <li>5. Rapor SMP (untuk beberapa jalur masuk)</li>
              <li>6. Pas foto terbaru</li>
              <li>7. Nilai hasil seleksi (jika ada tes masuk)</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Apakah ada program beasiswa untuk siswa yang berprestasi?
          </AccordionTrigger>
          <AccordionContent>
            Ya, sebagian besar SMK menyediakan beasiswa untuk siswa berprestasi
            dalam bidang akademik atau non-akademik. Beasiswa dapat diberikan
            oleh sekolah, pemerintah, atau lembaga swasta yang bekerja sama
            dengan sekolah.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            Bagaimana cara mengetahui jadwal pelajaran dan kegiatan
            ekstrakurikuler?
          </AccordionTrigger>
          <AccordionContent>
            Jadwal pelajaran dan ekstrakurikuler biasanya diberikan oleh sekolah
            saat awal tahun ajaran. Selain itu, sekolah juga menyediakan
            informasi melalui website resmi atau media sosial.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            Apa saja program ekstrakurikuler yang ditawarkan?
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              <li>1. Pramuka</li>
              <li>2. Paskibra</li>
              <li>3. OSIS</li>
              <li>4. Basket, sepak bola, atau futsal</li>
              <li>5. Seni musik, tari, dan teater</li>
              <li>6. Klub bahasa asing</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>
            Apakah SMK menyediakan fasilitas bimbingan belajar atau bimbingan
            karier?
          </AccordionTrigger>
          <AccordionContent>
            Sebagian besar SMK memiliki program bimbingan belajar dan bimbingan
            konseling yang membantu siswa dalam mengembangkan potensi diri,
            mempersiapkan kuliah, atau merencanakan karier.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>Berapa lama waktu belajar di SMK?</AccordionTrigger>
          <AccordionContent>
            Waktu belajar standar di SMK adalah 3 tahun, dimulai dari kelas 10
            hingga kelas 12. Namun, ada program percepatan atau akselerasi di
            beberapa sekolah bagi siswa yang memiliki prestasi akademik luar
            biasa.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger>
            Bagaimana sistem penilaian di SMK?
          </AccordionTrigger>
          <AccordionContent>
            Sistem penilaian di SMK biasanya mencakup ujian harian, tugas, ujian
            tengah semester (UTS), dan ujian akhir semester (UAS). Sekolah juga
            mengadakan ujian praktek dan penilaian sikap sebagai bagian dari
            evaluasi.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-9">
          <AccordionTrigger>
            Apakah SMK menyediakan fasilitas lab dan perpustakaan?
          </AccordionTrigger>
          <AccordionContent>
            Ya, sebagian besar SMK menyediakan fasilitas laboratorium (seperti
            lab sains, komputer, bahasa) dan perpustakaan untuk mendukung proses
            pembelajaran.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-10">
          <AccordionTrigger>
            Bagaimana cara memperoleh informasi lebih lanjut tentang SMK
            tertentu?
          </AccordionTrigger>
          <AccordionContent>
            Untuk informasi detail tentang SMK tertentu, kunjungi situs web
            resmi sekolah, ikuti media sosialnya, atau hubungi langsung pihak
            sekolah melalui telepon atau email yang tertera di website.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
