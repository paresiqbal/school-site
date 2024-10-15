import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SchoolHistory() {
  const timelineEvents = [
    { year: 1950, event: "School founded" },
    { year: 1965, event: "First graduating class" },
    { year: 1980, event: "New science building opened" },
    { year: 1995, event: "Centennial celebration" },
    { year: 2010, event: "Major campus renovation" },
    { year: 2020, event: "Launch of online learning program" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">Evergreen Academy</h1>
      <p className="mb-12 text-center text-xl">Established 1950</p>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>About Our School</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Evergreen Academy has been a pillar of educational excellence for
            over seven decades. Founded in 1950, our school has continuously
            evolved to meet the changing needs of our students while maintaining
            our core values of integrity, innovation, and community.
          </p>
        </CardContent>
      </Card>

      <h2 className="mb-6 text-3xl font-semibold">Our History</h2>
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
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,200+</p>
            <p className="text-sm text-muted-foreground">Enrolled annually</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Faculty</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">100+</p>
            <p className="text-sm text-muted-foreground">Dedicated educators</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Alumni</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">10,000+</p>
            <p className="text-sm text-muted-foreground">Graduates worldwide</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
