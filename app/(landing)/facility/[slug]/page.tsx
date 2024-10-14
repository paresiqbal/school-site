import Image from "next/image";

type DetailFacilityProps = { params: { slug: string } };

export default function FacilityDetails(props: DetailFacilityProps) {
  const { params } = props;

  const getFacilityDetails = (slug: string) => {
    switch (slug) {
      case "classrooms":
        return {
          name: "Classrooms",
          description:
            "This is where students attend their daily lessons and engage in learning activities.",
          image: "/assets/facility/classrooms.svg",
        };
      case "library":
        return {
          name: "Library",
          description:
            "This is where students read books, study, and conduct research.",
          image: "/assets/facility/library.svg",
        };

      default:
        return null;
    }
  };

  const facilityDetails = getFacilityDetails(params.slug);

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
