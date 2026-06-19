import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";

export const Route = createFileRoute("/exhibitions")({
  head: () => ({
    meta: [
      { title: "Exhibitions — Larry Madawa" },
      {
        name: "description",
        content: "Current and upcoming exhibitions of Larry Madawa's contemporary portraiture.",
      },
      { property: "og:title", content: "Exhibitions — Larry Madawa" },
    ],
  }),
  component: Exhibitions,
});

const exhibitions = [
  {
    when: "Oct 2024",
    title: "Sovereign Dreams",
    venue: "Circle Art Gallery",
    city: "Nairobi, Kenya",
    status: "Current",
  },
  {
    when: "Dec 2024",
    title: "Gold & Grit",
    venue: "Gallery 1957",
    city: "Accra, Ghana",
    status: "Upcoming",
  },
  {
    when: "Mar 2025",
    title: "The New Diaspora",
    venue: "Tate Modern",
    city: "London, UK",
    status: "Upcoming",
  },
  {
    when: "May 2023",
    title: "Echoes of the Crown",
    venue: "Gagosian",
    city: "London, UK",
    status: "Past",
  },
  {
    when: "Feb 2023",
    title: "First Portraits",
    venue: "Studio Madawa",
    city: "Nairobi, Kenya",
    status: "Past",
  },
];

function Exhibitions() {
  return (
    <SiteChrome>
      <section className="px-6 pb-12 pt-24">
        <div className="mx-auto max-w-[1600px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">Programme</p>
          <h1 className="mt-6 font-display text-6xl italic md:text-8xl">Exhibitions</h1>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1600px]">
          <ul className="divide-y divide-border border-t border-border">
            {exhibitions.map((e) => (
              <li
                key={e.title}
                className="group flex flex-col gap-2 py-10 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-baseline gap-8">
                  <span className="w-24 font-mono text-[10px] uppercase tracking-widest text-primary">
                    {e.when}
                  </span>
                  <h2 className="font-display text-3xl italic transition-colors group-hover:text-primary md:text-4xl">
                    {e.title}
                  </h2>
                </div>
                <div className="md:text-right">
                  <p className="text-sm">{e.venue}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {e.city} · {e.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteChrome>
  );
}
