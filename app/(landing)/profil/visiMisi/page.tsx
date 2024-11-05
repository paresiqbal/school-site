// ui lib
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
        <h1 className="mb-2 text-4xl font-bold md:mb-6 md:text-5xl">
          SMK Negeri 1 Rejang Lebong
        </h1>
        <p className="text-md mb-12 text-muted-foreground md:text-lg">
          Visi & Misi
        </p>
      </div>

      <div className="grid gap-8 pb-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col rounded-sm border p-4">
          <div className="mb-6 flex items-center gap-2 bg-primary p-2 font-semibold">
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

        <div className="flex flex-col rounded-sm border p-4">
          <div className="mb-6 flex items-center gap-2 bg-primary p-2 dark:text-background">
            <Eye className="h-6 w-6" />
            Visi Kami
          </div>

          <div className="flex-grow">
            <p>
              Menjadi SMK Unggul dan Berdaya Saing di Tingkat Global tahun 2033
            </p>
          </div>
        </div>

        <div className="flex flex-col rounded-sm border p-4 md:col-span-2 lg:col-span-1">
          <div className="mb-6 flex items-center bg-primary p-2 dark:text-background">
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

      <Card className="bg-emerald-50">
        <CardContent className="py-6">
          <blockquote className="border-l-4 border-emerald-600 pl-4 italic">
            <p className="text-lg text-gray-800">
              Education is the passport to the future, for tomorrow belongs to
              those who prepare for it today.
            </p>
            <footer className="mt-2 text-right text-muted-foreground">
              — Malcolm X
            </footer>
          </blockquote>
        </CardContent>
      </Card>
      <div className="mt-12 space-y-4 pb-8 text-center">
        <h2 className="text-4xl font-semibold">
          Bergabunglah dengan kami dalam membentuk masa depan
        </h2>
        <p className="text-base text-muted-foreground">
          SMK Negeri 1 Rejang Lebong, berkomitmen untuk memelihara generasi
          berikutnya para pemimpin, pemikir, dan pelaku. Bersama -sama, kita
          bisa membuat perbedaan.
        </p>
      </div>
    </div>
  );
}
