import Image from "next/image";
import Link from "next/link";

export default function GalleryPlugin() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <h2 className="mb-6 text-sm uppercase tracking-wide text-gray-500">
        GALLERY
      </h2>
      <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:items-start">
        <div className="w-full lg:w-3/4">
          <Image
            src="/assets/gallery.png"
            width={500}
            height={500}
            quality={100}
            alt="gallery"
            className="h-64 w-full rounded-md object-cover lg:h-72"
          />
        </div>
        <div className="w-full text-center lg:w-1/4 lg:text-left">
          <p className="mb-4 text-2xl font-bold leading-tight lg:text-3xl">
            Dokumentasi Foto & Video SMK Negeri 1 Rejang Lebong
          </p>
          <Link href="/gallery">
            <button className="hover:shadow-button mt-4 rounded-md border-2 border-foreground p-2 hover:bg-primary">
              Lihat Lebih Banyak
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
