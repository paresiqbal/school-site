import { facilitiesData } from "@/data/facilitiesData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { School, Users } from "lucide-react";
import Image from "next/image";

type DetailFacilityProps = { params: { slug: string } };

export default function FacilityDetails(props: DetailFacilityProps) {
  const { params } = props;

  const facilityDetails = facilitiesData.find(
    (facility) => facility.slug === params.slug,
  );

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <School className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">
                {facilityDetails?.name}
              </CardTitle>
              <CardDescription>{facilityDetails?.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="images" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="info">Information</TabsTrigger>
            </TabsList>
            <TabsContent value="images">
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {facilityDetails?.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${facilityDetails?.name} image ${index + 1}`}
                    width={600}
                    height={400}
                    className="h-64 w-full rounded-lg object-cover"
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="info">
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Capacity:</span>{" "}
                  {facilityDetails?.details.capacity}
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Equipment:</h3>
                  <ul className="list-inside list-disc space-y-1">
                    {facilityDetails?.details.equipment.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Safety Features:</h3>
                  <ul className="list-inside list-disc space-y-1">
                    {facilityDetails?.details.safetyFeatures.map(
                      (feature, index) => <li key={index}>{feature}</li>,
                    )}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
