import { DownloadIcon } from "lucide-react";

export default function Download() {
  const downloadGroups = [
    {
      category: "Jurnal",
      items: [
        { title: "Journal 1", link: "/path/to/journal1.pdf" },
        { title: "Journal 2", link: "/path/to/journal2.pdf" },
      ],
    },
    {
      category: "Panduan Sekolah",
      items: [
        { title: "Student Handbook", link: "/path/to/handbook.pdf" },
        { title: "Admission Guide", link: "/path/to/admission-guide.pdf" },
      ],
    },
    {
      category: "Lainya ",
      items: [
        { title: "School Calendar", link: "/path/to/calendar.pdf" },
        { title: "Events Brochure", link: "/path/to/brochure.pdf" },
      ],
    },
  ];

  return (
    <div className="mx-auto mb-8 max-w-[1200px] pt-6 md:pt-12">
      <div className="pb-4 text-center">
        <h1 className="mb-4 text-3xl font-bold md:text-5xl">Downloads</h1>
      </div>

      {downloadGroups.map((group, index) => (
        <div
          key={index}
          className="mb-6 border-2 border-foreground p-4 hover:shadow-card"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {group.category}
          </h2>
          <div className="mt-4 space-y-4">
            {group.items.map((item, itemIndex) => (
              <a
                key={itemIndex}
                href={item.link}
                download
                className="shadow-button flex transform items-center justify-between border-4 border-foreground bg-indigo-500/90 px-4 py-2 text-sm transition-all duration-150 ease-in-out hover:translate-y-1 active:bg-indigo-500"
              >
                {item.title}
                <span>
                  <DownloadIcon className="h-4 w-4 font-bold" />
                </span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
