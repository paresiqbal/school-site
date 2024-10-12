import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function Facility() {
  const facilities = [
    { name: "Classrooms", icon: School },
    { name: "Library", icon: Book },
    { name: "Science Lab", icon: FlaskConical },
    { name: "Music Room", icon: Music },
    { name: "Gymnasium", icon: Dumbbell },
    { name: "Cafeteria", icon: Utensils },
    { name: "Computer Lab", icon: Monitor },
    { name: "Auditorium", icon: Users },
    { name: "Nurse's Office", icon: Cross },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-center text-3xl font-bold">School Facilities</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility, index) => (
          <Card
            key={index}
            className="transition-shadow duration-300 hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <facility.icon
                className="h-8 w-8 text-primary"
                aria-hidden="true"
              />
              <CardTitle>{facility.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This is where students can{" "}
                {getFacilityDescription(facility.name.toLowerCase())}.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function getFacilityDescription(facilityName: string): string {
  switch (facilityName) {
    case "classrooms":
      return "attend their daily lessons and engage in learning activities";
    case "library":
      return "read books, study, and conduct research";
    case "science lab":
      return "perform experiments and learn about scientific concepts";
    case "music room":
      return "practice instruments and participate in music classes";
    case "gymnasium":
      return "engage in physical education and sports activities";
    case "cafeteria":
      return "eat meals and socialize during lunch breaks";
    case "computer lab":
      return "learn computer skills and work on digital projects";
    case "auditorium":
      return "attend assemblies, performances, and large gatherings";
    case "nurse's office":
      return "receive medical attention and health services";
    default:
      return "participate in various educational activities";
  }
}
