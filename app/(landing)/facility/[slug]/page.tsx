import { facilitiesData } from "@/data/facilitiesData";
import Image from "next/image";

type DetailFacilityProps = { params: { slug: string } };

export default function FacilityDetails(props: DetailFacilityProps) {
  const { params } = props;
  const facilityDetails = facilitiesData.find(
    (facility) => facility.slug === params.slug,
  );

  return (
    <div>
      <h1>Facility Detail page</h1>
      {facilityDetails ? (
        <>
          <h2>{facilityDetails.name}</h2>
          <p>{facilityDetails.description}</p>
          <Image
            src={facilityDetails.image}
            alt={facilityDetails.name}
            width={200}
            height={100}
          />
        </>
      ) : (
        <p>Facility not found.</p>
      )}
    </div>
  );
}
