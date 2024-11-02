export default function Download() {
  const downloadGroups = [
    {
      category: "Journal",
      items: [
        { title: "Journal 1", link: "/path/to/journal1.pdf" },
        { title: "Journal 2", link: "/path/to/journal2.pdf" },
      ],
    },
    {
      category: "School Guide",
      items: [
        { title: "Student Handbook", link: "/path/to/handbook.pdf" },
        { title: "Admission Guide", link: "/path/to/admission-guide.pdf" },
      ],
    },
    {
      category: "Other Resources",
      items: [
        { title: "School Calendar", link: "/path/to/calendar.pdf" },
        { title: "Events Brochure", link: "/path/to/brochure.pdf" },
      ],
    },
  ];

  return (
    <div className="container mx-auto mb-8 max-w-[1200px] px-4 pt-6 md:px-0 md:pt-12">
      <div className="pb-2">
        <h1 className="mb-2 text-3xl font-bold underline decoration-blue-500 underline-offset-8 md:mb-6 md:text-5xl">
          Download & Links
        </h1>
      </div>

      {downloadGroups.map((group, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {group.category}
          </h2>
          <div className="mt-2 flex flex-col gap-1">
            {group.items.map((item, itemIndex) => (
              <a
                key={itemIndex}
                href={item.link}
                download
                className="hover:underline"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
