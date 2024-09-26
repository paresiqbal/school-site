type DetailNewsProps = { params: { slug: string } };

export default function DetailNews(props: DetailNewsProps) {
  const { params } = props;
  console.log(params);

  return (
    <div>
      <h1>TItle</h1>
      <p>{params.slug}</p>
    </div>
  );
}
