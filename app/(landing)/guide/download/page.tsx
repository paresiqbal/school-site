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
    <div className="mx-auto mb-8 max-w-[1200px] pt-6 md:pt-12">
      <div className="pb-4 text-center">
        <h1 className="mb-4 text-3xl font-bold md:text-5xl">
          Download & Links
        </h1>
      </div>

      {downloadGroups.map((group, index) => (
        <div
          key={index}
          className="mb-6 border-4 border-black p-4 hover:shadow-card dark:border-white"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {group.category}
          </h2>
          <div className="mt-4 space-y-2">
            {group.items.map((item, itemIndex) => (
              <a
                key={itemIndex}
                href={item.link}
                download
                className="block border-2 border-black bg-indigo-500/80 px-4 py-2 font-semibold active:bg-indigo-500 dark:border-white"
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
