type DetailFacilityProps = { params: { slug: string } };

export default function FacilityDetails(props: DetailFacilityProps) {
  const { params } = props;

  return (
    <div>
      <h1>Facility Detail page</h1>
      <h2>{params.slug}</h2>
    </div>
  );
}
