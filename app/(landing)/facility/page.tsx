import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  School,
  Book,
  FlaskConical,
  Music,
  Dumbbell,
  Utensils,
  Monitor,
  Users,
  Cross,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Facility() {
  const facilities = [
    {
      id: 1,
      name: "Classrooms",
      icon: School,
      image: "/assets/facility/server.svg",
      description:
        "attend their daily lessons and engage in learning activities",
    },
    {
      id: 2,
      name: "Library",
      icon: Book,
      image: "/assets/facility/server.svg",
      description: "read books, study, and conduct research",
    },
    {
      id: 3,
      name: "Science Lab",
      icon: FlaskConical,
      image: "/assets/facility/server.svg",
      description: "perform experiments and learn about scientific concepts",
    },
    {
      id: 4,
      name: "Music Room",
      icon: Music,
      image: "/assets/facility/server.svg",
      description: "practice instruments and participate in music classes",
    },
    {
      id: 5,
      name: "Gymnasium",
      icon: Dumbbell,
      image: "/assets/facility/server.svg",
      description: "engage in physical education and sports activities",
    },
    {
      id: 6,
      name: "Cafeteria",
      icon: Utensils,
      image: "/assets/facility/server.svg",
      description: "eat meals and socialize during lunch breaks",
    },
    {
      id: 7,
      name: "Computer Lab",
      icon: Monitor,
      image: "/assets/facility/server.svg",
      description: "learn computer skills and work on digital projects",
    },
    {
      id: 8,
      name: "Auditorium",
      icon: Users,
      image: "/assets/facility/server.svg",
      description: "attend assemblies, performances, and large gatherings",
    },
    {
      id: 9,
      name: "Nurse's Office",
      icon: Cross,
      image: "/assets/facility/server.svg",
      description: "receive medical attention and health services",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-center text-3xl font-bold">Fasilitas Sekolah</h1>
      <h2 className="pb-8 text-xl">
        Temukan berbagai ruang dan sumber daya yang dirancang untuk meningkatkan
        pembelajaran dan kesejahteraan siswa.
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility, index) => (
          <Card
            key={index}
            className="transition-shadow duration-300 hover:scale-105 hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <facility.icon
                className="h-10 w-10 rounded-full bg-primary p-2 text-white"
                aria-label={facility.name}
              />
              <CardTitle>{facility.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This is where students can {facility.description}.
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
                href={`/facility/${facility.id}`}
                className="hover:underline"
              >
                Learn More
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold">What Our Students Say</h2>
        <p className="text-sm text-gray-600">
          The music room has really helped me grow as a musician!- Sarah, Grade
          10
        </p>
      </div>
    </div>
  );
}
