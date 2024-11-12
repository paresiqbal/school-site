import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Clock,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t-2 border-black bg-background px-8 py-12 font-[family-name:var(--font-geist-sans)] dark:border-white lg:px-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 border-black pb-4">
            <div className="flex items-center">
              <Image
                src="/blud.png"
                alt="SMKN 1 Rejang Lebong"
                width={60}
                height={60}
              />
              <h2 className="font-bold text-primary">
                SMK Negeri 1 Rejang Lebong
              </h2>
            </div>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/smknsatu.rejanglebong"
                className="hover:shadow-button rounded-full border-2 border-foreground bg-primary/90 p-1 hover:bg-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="r h-8 w-8 p-1 text-foreground" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.instagram.com/smkn1_rejang_lebong/"
                className="hover:shadow-button rounded-full border-2 border-foreground bg-primary/90 p-1 hover:bg-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="r h-8 w-8 p-1 text-foreground" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.youtube.com/@smkn1_rejang_lebong"
                className="hover:shadow-button rounded-full border-2 border-foreground bg-primary/90 p-1 hover:bg-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="r h-8 w-8 p-1 text-foreground" />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4 border-black pb-4">
            <h3 className="text-base font-bold text-primary">
              Jam Operasional
            </h3>
            <ul className="space-y-2 text-sm font-bold">
              <li className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>Senin - Jumat: 7:30 AM - 16:00 PM</span>
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>Sabtu: Ekstrakulikuler</span>
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>Minggu: Tutup</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 border-black pb-4">
            <h3 className="text-base font-bold text-primary">Kontak Kami</h3>
            <ul className="space-y-2 text-sm font-bold">
              <li className="flex items-center">
                <Phone className="border-1 mr-2 h-7 w-7 rounded-full border-2 border-foreground bg-primary/90 p-1" />
                <span>+62732 21258</span>
              </li>
              <li className="flex items-center">
                <Mail className="border-1 mr-2 h-7 w-7 rounded-full border-2 border-foreground bg-primary/90 p-1" />
                <span>mail@smkn1rl.sch.id</span>
              </li>
            </ul>
            <div>
              <h3 className="text-base font-bold text-primary">Alamat</h3>
              <address className="mt-2 flex items-start text-sm font-bold not-italic">
                <MapPin className="border-1 mr-2 h-7 w-7 rounded-full border-2 border-foreground bg-primary/90 p-1" />
                <span>
                  Jalan Ahmad Marzuki No 105
                  <br />
                  Kelurahan Air Rambai - Kecamatan Curup
                  <br />
                  Kabupaten Rejang Lebong
                  <br />
                  Bengkulu - Indonesia
                </span>
              </address>
            </div>
          </div>

          <div className="space-y-4 pb-4">
            <h3 className="text-base font-bold text-primary">Tautan</h3>
            <ul className="space-y-2 text-sm font-bold">
              <li>
                <Link href="#" className="hover:underline">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Administrasi
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Akademik
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Rute
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:underline">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t-4 border-black pt-8 md:flex-row">
          <p className="text-sm font-bold">
            &copy; {new Date().getFullYear()} SMK Negeri 1 Rejang Lebong. All
            rights reserved.
          </p>
          <div className="mt-4 space-x-4 md:mt-0">
            <Link
              href="#"
              className="border-b-2 border-black text-sm font-bold"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="border-b-2 border-black text-sm font-bold"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="border-b-2 border-black text-sm font-bold"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
