export default function DetailNews({ params }: { params: { slug: string } }) {
  return (
    <div>
      My Post: {params.slug}
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, eum!
      </h1>
    </div>
  );
}
