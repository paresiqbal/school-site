import Image from "next/image";
import Link from "next/link";

// ui lib
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// icons
import {
  School,
  Book,
  FlaskConical,
  Camera,
  Dumbbell,
  Utensils,
  Monitor,
  Users,
  Cross,
  ArrowRight,
} from "lucide-react";

export default function Facility() {
  const facilities = [
    {
      id: 1,
      name: "Kelas",
      icon: School,
      image: "/assets/facility/class.svg",
      description:
        "Siswa dapat mengikuti pelajaran harian dan terlibat dalam kegiatan pembelajaran di kelas.",
      slug: "kelas",
    },
    {
      id: 2,
      name: "Perpustakaan",
      icon: Book,
      image: "/assets/facility/library.svg",
      description:
        "Membaca buku, belajar, dan melakukan penelitian di perpustakaan.",
      slug: "perpustakaan",
    },
    {
      id: 3,
      name: "Laboratorium Sains",
      icon: FlaskConical,
      image: "/assets/facility/lab.svg",
      description: "Melakukan eksperimen dan mempelajari konsep ilmiah.",
      slug: "laboratorium-sains",
    },
    {
      id: 4,
      name: "Studio",
      icon: Camera,
      image: "/assets/facility/studio.svg",
      description: "Belajar fotografi, dan videografi.",
      slug: "studio",
    },
    {
      id: 5,
      name: "Lapangan",
      icon: Dumbbell,
      image: "/assets/facility/gym.svg",
      description: "Kegiatan pendidikan jasmani dan olahraga",
      slug: "lapangan",
    },
    {
      id: 6,
      name: "Kantin",
      icon: Utensils,
      image: "/assets/facility/cafe.svg",
      description: "Makan dan bersosialisasi selama jam istirahat makan siang",
      slug: "kantin",
    },
    {
      id: 7,
      name: "Lab Komputer",
      icon: Monitor,
      image: "/assets/facility/computer.svg",
      description:
        "Mempelajari keterampilan komputer dan mengerjakan proyek digital",
      slug: "lab-komputer",
    },
    {
      id: 8,
      name: "Lab Bahasa",
      icon: Users,
      image: "/assets/facility/audit.svg",
      description: "Mempelajari bahasa asing dan berlatih berbicara",
      slug: "lab-bahasa",
    },
    {
      id: 9,
      name: "Usaha Kesehatan Sekolah",
      icon: Cross,
      image: "/assets/facility/hospital.svg",
      description: "Menerima perhatian medis dan layanan kesehatan",
      slug: "uks",
    },
  ];

  return (
    <div className="container mx-auto mb-8 mt-4 flex max-w-[1200px] flex-col pt-6 md:pt-12">
      <div className="space-y-2 pb-8 text-center">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Fasilitas Sekolah
        </h1>
        <p className="text-md mb-12 text-muted-foreground md:text-lg">
          Temukan berbagai ruang dan sumber daya yang dirancang untuk
          meningkatkan pembelajaran dan kesejahteraan siswa.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility, index) => (
          <Card
            key={index}
            className="bg-yellow-50 transition-shadow duration-300 hover:scale-105 hover:shadow-lg dark:bg-card"
          >
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <facility.icon
                className="h-10 w-10 rounded-full bg-foreground p-2 text-background"
                aria-label={facility.name}
              />
              <CardTitle>{facility.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {facility.description}.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col pt-2">
              <Image
                src={facility.image}
                alt={`Image of ${facility.name}`}
                width={200}
                height={100}
                className="h-auto w-full rounded-md md:p-2"
              />
              <Link
                href={`/facility/${facility.slug}`}
                className="flex items-center justify-center decoration-yellow-500 underline-offset-2 hover:underline"
              >
                Pelajari Lebih Lanjut
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
