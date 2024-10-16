import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-12 py-4 text-center text-4xl font-bold">
        SMK Negeri 1 Rejang Lebong
      </h1>

      <div className="grid gap-8 py-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 bg-[#70FFAF] p-2 dark:text-background">
              <BookOpen className="h-6 w-6" />
              Misi Kami
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
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
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 bg-[#70FFAF] p-2 dark:text-background">
              <Eye className="h-6 w-6" />
              Visi Kami
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-lg">
              Menjadi SMK Unggul dan Berdaya Saing di Tingkat Global tahun 2033
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 bg-[#70FFAF] p-2 dark:text-background">
              <Target className="h-6 w-6" />
              Tujuan Kami
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
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
          </CardContent>
        </Card>
      </div>

      <Card className="mt-12 bg-[#121417] text-background dark:bg-background dark:text-foreground">
        <CardContent className="py-6">
          <blockquote className="border-l-4 border-[#70FFAF] pl-4 italic">
            <p className="text-lg">
              Education is the passport to the future, for tomorrow belongs to
              those who prepare for it today.
            </p>
            <footer className="mt-2 text-right text-muted-foreground">
              — Malcolm X
            </footer>
          </blockquote>
        </CardContent>
      </Card>

      <div className="mt-12 py-8 text-center">
        <h2 className="mb-4 text-2xl font-semibold">
          Bergabunglah dengan kami dalam membentuk masa depan
        </h2>
        <p className="text-lg text-muted-foreground">
          Di SMK Negeri 1 Rejang Lebong, berkomitmen untuk memelihara generasi
          berikutnya para pemimpin, pemikir, dan pelaku. Bersama -sama, kita
          bisa membuat perbedaan.
        </p>
      </div>
    </div>
  );
}
