// ui lib
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// icons
import { BookOpen, Eye, Target } from "lucide-react";

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
        <h1 className="mb-2 text-balance text-4xl font-bold md:mb-6 md:text-5xl">
          SMK Negeri 1 Rejang Lebong
        </h1>
        <p className="text-md mb-12 text-muted-foreground md:text-lg">
          Visi & Misi
        </p>
      </div>

      <div className="grid gap-8 pb-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col rounded-lg border p-6 shadow-lg transition hover:shadow-2xl">
          <div className="mb-6 flex items-center gap-2 rounded-lg bg-primary/80 p-3 font-semibold text-background">
            <BookOpen className="h-6 w-6" />
            Misi Kami
          </div>
          <div className="flex-grow text-gray-700 dark:text-gray-300">
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

        <div className="flex flex-col rounded-md border-2 border-black p-4 shadow-none transition hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:border-white dark:hover:shadow-[8px_8px_0px_rgba(255,255,255,1)]">
          <div className="mb-4 flex items-center gap-2 border-2 border-black bg-primary/80 p-3 font-bold text-background dark:border-white">
            <Eye className="h-6 w-6" />
            Visi Kami
          </div>
          <div className="flex-grow text-black dark:text-gray-300">
            <p className="font-sans text-lg">
              Menjadi SMK Unggul dan Berdaya Saing di Tingkat Global tahun 2033
            </p>
          </div>
        </div>

        <div className="flex flex-col rounded-lg border p-6 shadow-lg transition hover:shadow-2xl md:col-span-2 lg:col-span-1">
          <div className="mb-6 flex items-center gap-2 rounded-lg bg-primary/80 p-3 font-semibold text-background">
            <Target className="h-6 w-6" />
            Tujuan Kami
          </div>
          <div className="flex-grow text-gray-700 dark:text-gray-300">
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

      <div className="rounded-lg border bg-gradient-to-r from-rose-100 via-pink-50 to-rose-100 px-8 shadow-md">
        <div className="py-6">
          <blockquote className="border-l-4 border-primary pl-4 italic text-gray-700 dark:text-gray-600">
            <p className="text-lg">
              Education is the passport to the future, for tomorrow belongs to
              those who prepare for it today.
            </p>
            <footer className="mt-2 text-right font-semibold text-gray-700 dark:text-gray-600">
              — Malcolm X
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="mt-12 space-y-4 pb-8 text-center">
        <h2 className="text-pretty text-3xl font-semibold">
          Bergabunglah dengan kami dalam membentuk masa depan
        </h2>
        <p className="text-base text-gray-700 dark:text-gray-300">
          SMK Negeri 1 Rejang Lebong, berkomitmen untuk memelihara generasi
          berikutnya para pemimpin, pemikir, dan pelaku. Bersama-sama, kita bisa
          membuat perbedaan.
        </p>
        <Button className="mt-4 rounded-lg bg-primary/80 px-6 py-3 font-semibold shadow-md transition hover:bg-primary/90">
          Pelajari Jurusan
        </Button>
      </div>
    </div>
  );
}
