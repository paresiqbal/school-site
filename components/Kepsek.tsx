import Image from "next/image";

export default function Kepsek() {
  return (
    <div className="mx-auto w-full max-w-5xl overflow-hidden px-4 py-8 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-sm text-muted-foreground">Sambutan Kepala Sekolah</h2>
      <div className="items-baseline justify-between lg:flex lg:flex-row lg:gap-10">
        <Image src="/assets/asep2.png" width={500} height={800} alt="kepsek" />
        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold">
            Informasi dan Pengumuman Terbaru
          </p>
          <div>
            Assalamualaikum Warahmatullah Wabarakatuh Alhamdulillah, kami
            bersyukur kepada Allah SWT karena dengan rahmat dan karunia-Nya,
            akhirnya kami dapat memperbarui Website SMK Negeri 1 Rejang Lebong.
            Kami dengan tulus menyambut Anda di Website SMK Negeri 1 Rejang
            Lebong ini, yang ditujukan untuk semua unsur pimpinan, guru,
            karyawan, siswa, dan masyarakat umum. Melalui website ini, kami
            berharap semua pihak dapat mengakses informasi mengenai profil
            sekolah, kegiatan, dan fasilitas kami. Sebagai pimpinan sekolah,
            kami juga ingin menyampaikan terima kasih kepada tim pembuat website
            ini yang telah berusaha keras untuk memperkenalkan segala hal yang
            dimiliki oleh sekolah kami. Tentu saja, website sekolah kami masih
            memiliki kekurangan. Oleh karena itu, kami mengharapkan masukan dan
            kritik yang membangun dari seluruh civitas akademika dan masyarakat
            umum untuk kemajuan Website SMK Negeri 1 Rejang Lebong ke depannya.
            Kami berkomitmen untuk terus meningkatkan kualitas dan mengatasi
            kelemahan-kelemahan yang ada. Kami berharap Website SMK Negeri 1
            Rejang Lebong dapat menjadi wadah interaksi yang positif, baik antar
            civitas akademika maupun masyarakat umum. Melalui website ini, kami
            ingin menjalin silaturahmi yang erat di antara semua unsur. Mari
            kita bekerja dan berkarya dengan harapan ridho dari Allah SWT dan
            keikhlasan yang tulus dalam hati, demi kemajuan anak bangsa. Dengan
            semangat SMK BISA - SMK HEBAT - VOKASI KUAT - MENGUATKAN INDONESIA,
            mari kita bersama-sama mencapai prestasi yang gemilang dan mendukung
            perkembangan pendidikan di Indonesia. Demikian dan terima kasih.
            Wassalammualaikum Warahmatullah Wabarakatuh Dr. Asep Suparman, M.Pd.
            Kepala Sekolah
          </div>
        </div>
      </div>
    </div>
  );
}
