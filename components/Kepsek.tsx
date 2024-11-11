import Image from "next/image";

export default function Kepsek() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 font-[family-name:var(--font-geist-sans)]">
      <h2 className="mb-4 text-sm text-muted-foreground">
        Sambutan Kepala Sekolah
      </h2>
      <div className="lg:flex lg:gap-10">
        <div className="flex-shrink-0">
          <Image
            src="/assets/asep2.png"
            width={500}
            height={800}
            alt="Kepala Sekolah"
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="mt-6 lg:mt-0 lg:flex lg:flex-col lg:justify-center">
          <h3 className="mb-4 text-lg font-semibold text-primary">
            Informasi dan Pengumuman Terbaru
          </h3>
          <p className="space-y-4 leading-relaxed text-gray-700">
            Assalamualaikum Warahmatullah Wabarakatuh. Alhamdulillah, kami
            bersyukur kepada Allah SWT karena dengan rahmat dan karunia-Nya,
            akhirnya kami dapat memperbarui Website SMK Negeri 1 Rejang Lebong.
            Kami dengan tulus menyambut Anda di Website SMK Negeri 1 Rejang
            Lebong ini, yang ditujukan untuk semua unsur pimpinan, guru,
            karyawan, siswa, dan masyarakat umum. Melalui website ini, kami
            berharap semua pihak dapat mengakses informasi mengenai profil
            sekolah, kegiatan, dan fasilitas kami.
          </p>
          <p className="space-y-4 leading-relaxed text-gray-700">
            Sebagai pimpinan sekolah, kami juga ingin menyampaikan terima kasih
            kepada tim pembuat website ini yang telah berusaha keras untuk
            memperkenalkan segala hal yang dimiliki oleh sekolah kami. Tentu
            saja, website sekolah kami masih memiliki kekurangan. Oleh karena
            itu, kami mengharapkan masukan dan kritik yang membangun dari
            seluruh civitas akademika dan masyarakat umum untuk kemajuan Website
            SMK Negeri 1 Rejang Lebong ke depannya.
          </p>
          <p className="space-y-4 leading-relaxed text-gray-700">
            Kami berkomitmen untuk terus meningkatkan kualitas dan mengatasi
            kelemahan-kelemahan yang ada. Kami berharap Website SMK Negeri 1
            Rejang Lebong dapat menjadi wadah interaksi yang positif, baik antar
            civitas akademika maupun masyarakat umum. Melalui website ini, kami
            ingin menjalin silaturahmi yang erat di antara semua unsur. Mari
            kita bekerja dan berkarya dengan harapan ridho dari Allah SWT dan
            keikhlasan yang tulus dalam hati, demi kemajuan anak bangsa.
          </p>
          <p className="space-y-4 leading-relaxed text-gray-700">
            Dengan semangat{" "}
            <strong>
              SMK BISA - SMK HEBAT - VOKASI KUAT - MENGUATKAN INDONESIA
            </strong>
            , mari kita bersama-sama mencapai prestasi yang gemilang dan
            mendukung perkembangan pendidikan di Indonesia.
          </p>
          <p className="mt-6 text-sm font-medium">
            Wassalammualaikum Warahmatullah Wabarakatuh
          </p>
          <p className="mt-1 text-sm font-medium text-gray-700">
            Dr. Asep Suparman, M.Pd.
          </p>
          <p className="text-sm font-medium text-gray-700">Kepala Sekolah</p>
        </div>
      </div>
    </section>
  );
}
