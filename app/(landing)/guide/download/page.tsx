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
    <div className="mx-auto mb-8 max-w-[1200px] px-4 pt-6 md:px-0 md:pt-12">
      <div className="pb-4 text-center">
        <h1 className="mb-4 text-3xl font-bold underline decoration-blue-500 underline-offset-8 md:text-5xl">
          Download & Links
        </h1>
      </div>

      {downloadGroups.map((group, index) => (
        <div
          key={index}
          className="mb-6 border-4 border-black p-4 shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[8px_8px_0px_rgba(255,255,255,1)]"
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
                className="block border-2 border-black bg-gray-100 px-4 py-2 text-lg font-semibold hover:bg-gray-200 dark:border-white dark:bg-gray-800 dark:hover:bg-gray-700"
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
