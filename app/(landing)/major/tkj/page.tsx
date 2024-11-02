import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, BriefcaseIcon, Hammer, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ComputerScienceMajorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="mb-4 text-4xl font-bold">
            Teknik Komputer & Jaringan
          </h1>
          <p className="mb-6 text-xl text-muted-foreground">
            Selami dunia komputasi, internet dan jaringan.
          </p>
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Computer Science students working on a project"
            width={800}
            height={400}
            className="mb-6 rounded-lg"
          />
          <div className="prose max-w-none">
            <p>
              Program Teknik Komputer & Jaringan (TKJ) adalah program studi yang
              mempelajari tentang teknologi komputer, jaringan, dan internet.
              Program ini dirancang untuk mempersiapkan siswa menjadi
              profesional di bidang teknologi informasi dan komunikasi.
            </p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Program Sorotan</CardTitle>
            <CardDescription>
              Program Teknik Komputer & Jaringan menawarkan:
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-4">
              <BookOpen className="h-4 w-4" />
              <div className="font-medium">Kurikulum Komprehensif</div>
            </div>
            <div className="flex items-center gap-4">
              <Users className="h-4 w-4" />
              <div className="font-medium">Proyek Kolaboratif</div>
            </div>
            <div className="flex items-center gap-4">
              <BriefcaseIcon className="h-4 w-4" />
              <div className="font-medium">Magang Industri</div>
            </div>
            <div className="flex items-center gap-4">
              <Hammer className="h-4 w-4" />
              <div className="font-medium">Peluang Kerja</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="mt-12">
        <TabsList>
          <TabsTrigger value="courses">Materi Utama</TabsTrigger>
          <TabsTrigger value="careers">Prospek Karir</TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Dasar-dasar Komputer",
              "Jaringan Komputer",
              "Administrasi Server",
              "Teknologi Jaringan Nirkabel",
              "Keamanan Jaringan",
              "Pengelolaan Jaringan",
              "Pemrograman Dasar",
              "Cloud Computing",
              "Internet of Things (IoT)",
            ].map((course) => (
              <Card key={course}>
                <CardHeader>
                  <CardTitle className="text-lg">{course}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="careers" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Teknisi Komputer",
              "Network Administrator",
              "IT Support",
              "Administrator Server",
              "Teknisi Jaringan Nirkabel",
              "Spesialis Keamanan Jaringan",
              "Administrator Cloud",
              "Teknisi IoT",
              "Web Developer atau Programmer",
            ].map((career) => (
              <Card key={career}>
                <CardHeader>
                  <CardTitle className="text-lg">{career}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <h2 className="mb-4 text-2xl font-bold">
          Siap untuk memulai karir Anda di dunia teknologi?
        </h2>
        <Button asChild size="lg">
          <Link href="/other/register">Daftar Sekarang</Link>
        </Button>
      </div>
    </div>
  );
}
