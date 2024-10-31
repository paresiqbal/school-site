export default function Download() {
  const downloads = [
    { title: "Document 1", link: "/path/to/document1.pdf" },
    { title: "Document 2", link: "/path/to/document2.pdf" },
    { title: "Document 3", link: "/path/to/document3.pdf" },
  ];

  return (
    <div className="container mx-auto mb-8 max-w-[1200px] px-4 pt-6 md:px-0 md:pt-12">
      <div className="pb-2">
        <h1 className="mb-2 text-3xl font-bold underline decoration-rose-500 underline-offset-8 md:mb-6 md:text-5xl">
          Download & Links
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        <p>Materi Pembelajaran</p>
        {downloads.map((download, index) => (
          <a
            key={index}
            href={download.link}
            download
            className="text-blue-500 hover:underline"
          >
            {download.title}
          </a>
        ))}
      </div>
    </div>
  );
}
