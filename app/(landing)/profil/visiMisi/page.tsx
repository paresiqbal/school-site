// ui lib
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// icons
import { BookOpen, Eye, Target } from "lucide-react";
import Link from "next/link";

export default function MissionVisionGoals() {
  const missions = [
    "Mewujudkan pendidik dan tenaga kependidikan yang mampu memanfaatkan teknologi terkini dan professional.",
    "Mewujudkan proses pembelajaran yang berkualitas dan terintegrasi untuk membentuk karakter siswa.",
    "Menumbuhkan lingkungan belajar yang kreatif dan inovatif bagi siswa.",
    "Mewujudkan sarana prasarana berstandar industri dan berwawasan lingkungan.",
    "Mengembangkan kerjasama yang luas dan bermakna dengan dunia kerja nasional dan internasional.",
  ];

  const goals = [
    "Menjadikan pendidik dan tenaga kependidikan yang berkarakter dan berdedikasi.",
    "Meningkatkan kompetensi pendidik dan tenaga kependidikan sesuai dengan perkembangan teknologi.",
    "Menjadikan pendidik dan tenaga kependidikan yang mampu bekerja dengan menggunakan teknologi informasi.",
    "Menerapkan pembelajaran yang berpihak kepada siswa.",
    "Membentuk siswa yang bisa berwirausaha secara nasional dan internasional.",
  ];

  return (
    <div className="mx-auto mt-4 flex max-w-[1200px] flex-col pt-6 md:items-center md:justify-center md:pt-12">
      <div className="space-y-2 pb-8 text-center">
        <h1 className="scroll-m-20 text-balance text-4xl font-bold tracking-tight lg:text-5xl">
          SMK Negeri 1 Rejang Lebong
        </h1>
        <p className="text-md mb-12 text-muted-foreground md:text-lg">
          Visi & Misi
        </p>
      </div>

      <div className="grid gap-8 pb-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="group flex flex-col rounded-md border-2 border-foreground p-4 transition hover:shadow-card">
          <div className="mb-4 flex items-center gap-2 border-2 border-foreground bg-primary/90 p-3 font-bold text-background transition group-hover:bg-primary">
            <BookOpen className="h-6 w-6" />
            Misi Kami
          </div>
          <div className="flex-grow">
            <ul className="space-y-2">
              {missions.map((mission, index) => (
                <li key={index} className="flex items-start">
                  <Badge variant="secondary" className="mr-2 mt-1">
                    {index + 1}
                  </Badge>
                  <span>{mission}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="group flex flex-col rounded-md border-2 border-foreground p-4 transition hover:shadow-card">
          <div className="mb-4 flex items-center gap-2 border-2 border-foreground bg-primary/90 p-3 font-bold text-background transition group-hover:bg-primary">
            <Eye className="h-6 w-6" />
            Visi Kami
          </div>
          <div className="flex-grow">
            <p className="font-sans text-lg">
              Menjadi SMK Unggul dan Berdaya Saing di Tingkat Global tahun 2033
            </p>
          </div>
        </div>

        <div className="group flex flex-col rounded-md border-2 border-foreground p-4 transition hover:shadow-card">
          <div className="mb-4 flex items-center gap-2 border-2 border-foreground bg-primary/90 p-3 font-bold text-background transition group-hover:bg-primary">
            <Target className="h-6 w-6" />
            Tujuan Kami
          </div>
          <div className="flex-grow">
            <ul className="space-y-2">
              {goals.map((goal, index) => (
                <li key={index} className="flex items-start">
                  <Badge variant="secondary" className="mr-2 mt-1">
                    {index + 1}
                  </Badge>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-md border-2 border-foreground bg-primary-foreground px-8 transition hover:shadow-card">
        <div className="py-6">
          <blockquote className="border-l-4 border-primary pl-4 dark:text-gray-700">
            <p className="text-xl font-bold">
              Education is the passport to the future, for tomorrow belongs to
              those who prepare for it today.
            </p>
            <footer className="font-semibol mt-2 text-right">
              — Malcolm X
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="mt-12 space-y-4 pb-8 text-center">
        <h2 className="text-2xl font-semibold md:text-3xl">
          Bergabunglah dengan kami dalam membentuk masa depan
        </h2>
        <p className="text-base">
          SMK Negeri 1 Rejang Lebong, berkomitmen untuk memelihara generasi
          berikutnya para pemimpin, pemikir, dan pelaku. Bersama-sama, kita bisa
          membuat perbedaan.
        </p>
        <Button
          asChild
          size="lg"
          className="hover:shadow-button border-2 border-foreground"
        >
          <Link href="/guide/registration">Daftar Sekarang</Link>
        </Button>
      </div>
    </div>
  );
}
