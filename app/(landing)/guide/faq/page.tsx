"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <div className="mx-auto my-8 max-w-[1200px] pt-6 font-[family-name:var(--font-geist-sans)] md:pt-12">
      <div className="pb-4 text-center">
        <h1 className="mb-4 text-3xl font-bold md:text-5xl">FAQ</h1>
        <p className="text-md mb-4 text-muted-foreground md:text-lg">
          Pertanyaan yang sering ditanyakan seputar SMK.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {[
          {
            question: "Kapan jadwal pendaftaran siswa baru dibuka?",
            answer:
              "Jadwal pendaftaran siswa baru biasanya dibuka setiap tahun pada bulan Juni hingga Juli, tergantung kebijakan pemerintah daerah dan sekolah masing-masing. Untuk informasi terkini, cek situs resmi sekolah atau dinas pendidikan setempat.",
          },
          {
            question: "Apa saja persyaratan masuk SMK 1 Rejang Lebong?",
            answer: (
              <ul className="ml-6 list-disc">
                <li>Ijazah SMP atau MTs</li>
                <li>Surat keterangan lulus</li>
                <li>Akta kelahiran</li>
                <li>Kartu keluarga (KK)</li>
                <li>Rapor SMP (untuk beberapa jalur masuk)</li>
                <li>Pas foto terbaru</li>
                <li>Nilai hasil seleksi (jika ada tes masuk)</li>
              </ul>
            ),
          },
          {
            question:
              "Apakah ada program beasiswa untuk siswa yang berprestasi?",
            answer:
              "Ya, sebagian besar SMK menyediakan beasiswa untuk siswa berprestasi dalam bidang akademik atau non-akademik. Beasiswa dapat diberikan oleh sekolah, pemerintah, atau lembaga swasta yang bekerja sama dengan sekolah.",
          },
          {
            question:
              "Bagaimana cara mengetahui jadwal pelajaran dan kegiatan ekstrakurikuler?",
            answer:
              "Jadwal pelajaran dan ekstrakurikuler biasanya diberikan oleh sekolah saat awal tahun ajaran. Selain itu, sekolah juga menyediakan informasi melalui website resmi atau media sosial.",
          },
          {
            question: "Apa saja program ekstrakurikuler yang ditawarkan?",
            answer: (
              <ul className="ml-6 list-disc">
                <li>Pramuka</li>
                <li>Paskibra</li>
                <li>OSIS</li>
                <li>Basket, sepak bola, atau futsal</li>
                <li>Seni musik, tari, dan teater</li>
                <li>Klub bahasa asing</li>
              </ul>
            ),
          },
          {
            question:
              "Apakah SMK menyediakan fasilitas bimbingan belajar atau bimbingan karier?",
            answer:
              "Sebagian besar SMK memiliki program bimbingan belajar dan bimbingan konseling yang membantu siswa dalam mengembangkan potensi diri, mempersiapkan kuliah, atau merencanakan karier.",
          },
          {
            question: "Berapa lama waktu belajar di SMK?",
            answer:
              "Waktu belajar standar di SMK adalah 3 tahun, dimulai dari kelas 10 hingga kelas 12. Namun, ada program percepatan atau akselerasi di beberapa sekolah bagi siswa yang memiliki prestasi akademik luar biasa.",
          },
          {
            question: "Bagaimana sistem penilaian di SMK?",
            answer:
              "Sistem penilaian di SMK biasanya mencakup ujian harian, tugas, ujian tengah semester (UTS), dan ujian akhir semester (UAS). Sekolah juga mengadakan ujian praktek dan penilaian sikap sebagai bagian dari evaluasi.",
          },
          {
            question: "Apakah SMK menyediakan fasilitas lab dan perpustakaan?",
            answer:
              "Ya, sebagian besar SMK menyediakan fasilitas laboratorium (seperti lab sains, komputer, bahasa) dan perpustakaan untuk mendukung proses pembelajaran.",
          },
          {
            question:
              "Bagaimana cara memperoleh informasi lebih lanjut tentang SMK tertentu?",
            answer:
              "Untuk informasi detail tentang SMK tertentu, kunjungi situs web resmi sekolah, ikuti media sosialnya, atau hubungi langsung pihak sekolah melalui telepon atau email yang tertera di website.",
          },
        ].map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index + 1}`}
            className="border-2 border-foreground p-4 transition hover:shadow-card"
          >
            <AccordionTrigger className="text-base font-bold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="mt-2 text-sm">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
