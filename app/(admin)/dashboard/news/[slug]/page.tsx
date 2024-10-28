export default function NewsDetails({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>;
}
