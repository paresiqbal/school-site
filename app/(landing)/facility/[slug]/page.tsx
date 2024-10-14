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
      <h1>Facility Detail Page</h1>
      {facilityDetails ? (
        <>
          <h2>{facilityDetails.name}</h2>
          <p>{facilityDetails.description}</p>
          <div>
            {facilityDetails.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={facilityDetails.name}
                width={200}
                height={100}
              />
            ))}
          </div>
          <h3>Details</h3>
          <p>
            <strong>Capacity:</strong> {facilityDetails.details.capacity}
          </p>
          <h4>Equipment:</h4>
          <ul>
            {facilityDetails.details.equipment.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h4>Safety Features:</h4>
          <ul>
            {facilityDetails.details.safetyFeatures.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Facility not found.</p>
      )}
    </div>
  );
}
