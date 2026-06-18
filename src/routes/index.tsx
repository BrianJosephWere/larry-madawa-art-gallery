import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import { artworks, formatPrice } from "@/lib/artworks";
import { useCart } from "@/lib/cart";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Larry Madawa — Contemporary Portraiture" },
      {
        name: "description",
        content:
          "Large-scale oil portraits by Larry Madawa, exploring African identity, regality, and inheritance. Available works, exhibitions, and acquisitions.",
      },
      {
        property: "og:title",
        content: "Larry Madawa — Contemporary Portraiture",
      },
      {
        property: "og:description",
        content:
          "Large-scale contemporary oil portraiture exploring African identity, regality, and inheritance.",
      },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = artworks.slice(0, 4);
  const { add, setOpen } = useCart();

  return (
    <SiteChrome>
      {/* Hero */}
      <header className="relative flex h-[92vh] flex-col justify-end overflow-hidden px-6 pb-20">
        <div className="animate-spotlight absolute inset-0 -z-10">
          <img
            src={hero}
            alt="Featured portrait: The Crown of Olorun"
            width={1600}
            height={1024}
            className="h-full w-full object-cover opacity-70"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 60% 40%, transparent 0%, var(--background) 90%)",
            }}
          />
        </div>

        <div className="animate-reveal mx-auto w-full max-w-[1600px]">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
            Featured Work / The Crown of Olorun
          </p>
          <h1 className="mb-8 text-balance font-display text-6xl italic leading-[0.85] tracking-tight md:text-9xl">
            Larry Madawa
          </h1>
          <div className="flex flex-col gap-8 md:flex-row md:items-end">
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Exploring the intersection of pre-colonial regal aesthetics and
              contemporary African identity through large-scale oil portraiture.
            </p>
            <Link
              to="/works"
              className="self-start border border-primary px-8 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              View Collection
            </Link>
          </div>
        </div>
      </header>

      {/* Works index */}
      <main className="px-6 py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-24 flex items-end justify-between border-b border-border pb-4">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Works / 2024 Index
            </h2>
            <span className="font-display text-2xl italic">
              New Acquisitions
            </span>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-32 md:grid-cols-2">
            {featured.map((w, i) => (
              <div
                key={w.slug}
                className={`group ${i % 2 === 1 ? "md:mt-32" : ""}`}
              >
                <div className="relative mb-6 aspect-[3/4] overflow-hidden ring-1 ring-border transition-all duration-700 group-hover:ring-primary/50">
                  <Link to="/works/$slug" params={{ slug: w.slug }}>
                    <img
                      src={w.image}
                      alt={w.title}
                      loading="lazy"
                      width={900}
                      height={1200}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                  </Link>
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-background/0 p-6 opacity-0 transition-all duration-500 group-hover:bg-background/50 group-hover:opacity-100">
                    <button
                      onClick={() => {
                        add({
                          slug: w.slug,
                          title: w.title,
                          price: w.price,
                          image: w.image,
                          medium: w.medium,
                        });
                        setOpen(true);
                      }}
                      className="pointer-events-auto w-full translate-y-4 bg-primary py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-transform duration-500 group-hover:translate-y-0"
                    >
                      Add to cart — {formatPrice(w.price)}
                    </button>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="mb-2 block font-mono text-[10px] text-primary">
                      {w.index}
                    </span>
                    <Link
                      to="/works/$slug"
                      params={{ slug: w.slug }}
                      className="font-display text-3xl italic tracking-tight transition-colors hover:text-primary"
                    >
                      {w.title}
                    </Link>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {w.medium}, {w.year}
                    </p>
                  </div>
                  <span className="font-mono text-xs">{w.dimensions}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 flex justify-center">
            <Link
              to="/works"
              className="border border-border px-10 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              View All Works
            </Link>
          </div>
        </div>
      </main>

      {/* Statement */}
      <section className="border-t border-border px-6 py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary md:col-span-3">
            On The Work
          </p>
          <blockquote className="font-display text-3xl italic leading-tight md:col-span-9 md:text-5xl">
            “I paint the people who have been historically left outside the
            frame — not as protest, but as record. The frame has always belonged
            to us.”
            <footer className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] not-italic text-muted-foreground">
              — Larry Madawa
            </footer>
          </blockquote>
        </div>
      </section>
    </SiteChrome>
  );
}
