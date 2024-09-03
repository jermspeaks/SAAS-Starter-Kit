import Link from "next/link";
import { allGuides } from "./../../../../generated/Guide/_index.mjs";
import { compareDesc } from "date-fns";

import { formatDate } from "@/lib/utils";
import { DocsPageHeader } from "@/components/widgets/page-header";

export const metadata = {
  title: "Guides",
  description:
    "This section includes end-to-end guides for developing Next.js 13 apps.",
};

export default function GuidesPage() {
  const guides = allGuides
    .filter((guide) => guide.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <div className="py-6 lg:py-10">
      <DocsPageHeader
        heading="Guides"
        text="This section includes end-to-end guides for developing Next.js 13 apps."
      />
      {guides?.length ? (
        <div className="gap-4 md:gap-6 grid md:grid-cols-2">
          {guides.map((guide) => (
            <article
              key={guide._id}
              className="relative shadow-md hover:shadow-lg p-6 border rounded-lg transition-shadow group"
            >
              {guide.featured && (
                <span className="top-4 right-4 absolute px-3 py-1 rounded-full font-medium text-xs">
                  Featured
                </span>
              )}
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="font-medium text-xl tracking-tight">
                    {guide.title}
                  </h2>
                  {guide.description && (
                    <p className="text-muted-foreground">{guide.description}</p>
                  )}
                </div>
                {guide.date && (
                  <p className="text-muted-foreground text-sm">
                    {formatDate(guide.date)}
                  </p>
                )}
              </div>
              <Link href={guide.slug} className="absolute inset-0">
                <span className="sr-only">View</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No guides published.</p>
      )}
    </div>
  );
}
