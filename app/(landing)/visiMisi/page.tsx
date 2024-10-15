import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Eye, Target } from "lucide-react";

export default function MissionVisionGoals() {
  const goals = [
    "Achieve 100% graduation rate",
    "Implement innovative STEM programs",
    "Foster a diverse and inclusive community",
    "Enhance global learning opportunities",
    "Develop strong character and leadership skills",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-12 text-center text-4xl font-bold">
        Evergreen Academy
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-lg">
              To empower students with knowledge, skills, and values to thrive
              in a rapidly changing world, fostering a lifelong love for
              learning and a commitment to positive global impact.
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-6 w-6" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-lg">
              To be a leading educational institution that inspires and prepares
              students to become innovative thinkers, compassionate leaders, and
              responsible global citizens.
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              Our Goals
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

      <Card className="mt-12">
        <CardContent className="py-6">
          <blockquote className="border-l-4 border-primary pl-4 italic">
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

      <div className="mt-12 text-center">
        <h2 className="mb-4 text-2xl font-semibold">
          Join Us in Shaping the Future
        </h2>
        <p className="text-lg text-muted-foreground">
          At Evergreen Academy, were committed to nurturing the next generation
          of leaders, thinkers, and doers. Together, we can make a difference.
        </p>
      </div>
    </div>
  );
}
