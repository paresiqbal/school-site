import Image from "next/image";

export default function KepsekPlugin() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-sm text-muted-foreground">SAMBUTAN</h2>
      <div className="lg:flex lg:gap-10">
        <div className="flex-shrink-0">
          <Image
            src="/assets/asep2.png"
            width={500}
            height={800}
            alt="Kepala Sekolah"
            className="rounded-md"
          />
        </div>
        <div className="mt-6 lg:mt-0 lg:flex lg:flex-col">
          <h3 className="mb-4 text-lg font-semibold text-primary">
            Sambutan Kepala Sekolah
          </h3>
          <p className="space-y-4 leading-relaxed">
            Assalamualaikum Warahmatullah Wabarakatuh. Alhamdulillah, kami
            bersyukur kepada Allah SWT karena dengan rahmat dan karunia-Nya,
            akhirnya kami dapat memperbarui Website SMK Negeri 1 Rejang Lebong.
            Kami dengan tulus menyambut Anda di Website SMK Negeri 1 Rejang
            Lebong ini, yang ditujukan untuk semua unsur pimpinan, guru,
            karyawan, siswa, dan masyarakat umum. Melalui website ini, kami
            berharap semua pihak dapat mengakses informasi mengenai profil
            sekolah, kegiatan, dan fasilitas kami.
          </p>
          <p className="space-y-4 leading-relaxed">
            Sebagai pimpinan sekolah, kami juga ingin menyampaikan terima kasih
            kepada tim pembuat website ini yang telah berusaha keras untuk
            memperkenalkan segala hal yang dimiliki oleh sekolah kami. Tentu
            saja, website sekolah kami masih memiliki kekurangan. Oleh karena
            itu, kami mengharapkan masukan dan kritik yang membangun dari
            seluruh civitas akademika dan masyarakat umum untuk kemajuan Website
            SMK Negeri 1 Rejang Lebong ke depannya.
          </p>
          <p className="space-y-4 leading-relaxed">
            Kami berkomitmen untuk terus meningkatkan kualitas dan mengatasi
            kelemahan-kelemahan yang ada. Kami berharap Website SMK Negeri 1
            Rejang Lebong dapat menjadi wadah interaksi yang positif, baik antar
            civitas akademika maupun masyarakat umum. Melalui website ini, kami
            ingin menjalin silaturahmi yang erat di antara semua unsur. Mari
            kita bekerja dan berkarya dengan harapan ridho dari Allah SWT dan
            keikhlasan yang tulus dalam hati, demi kemajuan anak bangsa.
          </p>
          <p className="space-y-4 leading-relaxed">
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
          <p className="mt-1 text-sm font-medium">Dr. Asep Suparman, M.Pd.</p>
          <p className="text-sm font-medium">Kepala Sekolah</p>
        </div>
      </div>
    </section>
  );
}
