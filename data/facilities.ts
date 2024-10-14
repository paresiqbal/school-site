import { School } from "lucide-react";

interface Facility {
  name: string;
  icon: React.ComponentType; // or the specific type if you want
  image: string;
  description: string;
  slug: string;
}

const facilities: Facility[] = [
  {
    name: "Classrooms",
    icon: School,
    image: "/assets/facility/server.svg",
    description: "learn and study",
    slug: "classrooms",
  },
];

export default facilities;
