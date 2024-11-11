import Image from "next/image";
import Link from "next/link";

export default function GalleryPlugin() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <h2 className="mb-6 text-sm uppercase tracking-wide text-gray-500">
        GALLERY
      </h2>
      <div className="flex items-center justify-between gap-6">
        <div className="w-3/4">
          <Image
            src="/assets/gallery.png"
            width={500}
            height={500}
            quality={100}
            alt="gallery"
            className="h-72 w-full rounded-md object-cover"
          />
        </div>
        <div className="w-1/4">
          <p className="mb-4 text-3xl font-bold leading-tight">
            Dokumentasi Foto & Video SMK Negeri 1 Rejang Lebong
          </p>
          <Link href="/gallery">
            <button className="hover:shadow-button rounded-md border-2 border-foreground bg-primary/90 p-2 text-background hover:bg-primary">
              Lihat Lebih Banyak
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
