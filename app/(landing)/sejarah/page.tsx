import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SchoolHistory() {
  const timelineEvents = [
    { year: 1950, event: "Sekolah didirikan" },
    { year: 1965, event: "Kelas kelulusan pertama" },
    { year: 1980, event: "Gedung sains baru dibuka" },
    { year: 1995, event: "Perayaan ulang tahun keseratus" },
    { year: 2010, event: "Renovasi kampus besar" },
    { year: 2020, event: "Peluncuran program pembelajaran daring" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">
        SMK Negeri 1 Rejang Lebong
      </h1>
      <p className="mb-12 text-center text-xl">Didirikan 1950</p>

      <div className="mb-12">
        <h2 className="w-auto max-w-xs bg-[#70FFAF] p-2 text-2xl font-bold dark:text-background lg:text-3xl">
          Tentang Sekolah
        </h2>
        <div>
          <p className="pt-2 text-base text-muted-foreground lg:text-lg">
            SMKN 1 Rejang Lebong telah menjadi pilar keunggulan pendidikan
            selama lebih dari tujuh dekade. Didirikan pada tahun 1950, sekolah
            kami terus berkembang untuk memenuhi kebutuhan siswa yang terus
            berubah sambil mempertahankan nilai-nilai inti kami, yaitu
            integritas, inovasi, dan komunitas.
          </p>
        </div>
      </div>

      <h2 className="mb-6 max-w-xs bg-[#70FFAF] p-2 text-2xl font-semibold dark:text-background lg:text-3xl">
        Sejarah
      </h2>
      <div className="space-y-8">
        {timelineEvents.map((event, index) => (
          <div key={index} className="flex items-center">
            <Badge variant="outline" className="mr-4 px-3 py-1 text-lg">
              {event.year}
            </Badge>
            <Card className="flex-grow">
              <CardContent className="py-4">
                <p>{event.event}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="bg-[#121417] text-background dark:bg-background dark:text-foreground">
          <CardHeader>
            <CardTitle>Siswa</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">200+</p>
            <p className="text-sm text-muted-foreground">
              Terdaftar setiap tahun
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#121417] text-background dark:bg-background dark:text-foreground">
          <CardHeader>
            <CardTitle>Major</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">7</p>
            <p className="text-sm text-muted-foreground">
              Pendidik yang berdedikasi
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#121417] text-background dark:bg-background dark:text-foreground">
          <CardHeader>
            <CardTitle>Alumni</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">5,000+</p>
            <p className="text-sm text-muted-foreground">Lulusan Terbaik</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
