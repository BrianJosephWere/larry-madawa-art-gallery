import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import { fetchArtworks, formatPrice } from "@/lib/artworks";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/works")({
  loader: async () => {
    const list = await fetchArtworks();
    return { artworks: list };
  },
  head: () => ({
    meta: [
      { title: "Works — Larry Madawa" },
      {
        name: "description",
        content:
          "The current index of available oil portraits by Larry Madawa. Acquire directly from the studio.",
      },
      { property: "og:title", content: "Works — Larry Madawa" },
      {
        property: "og:description",
        content: "The current index of available oil portraits by Larry Madawa.",
      },
    ],
  }),
  component: Works,
});

function Works() {
  const { artworks } = Route.useLoaderData();
  const { add, setOpen } = useCart();
  return (
    <SiteChrome>
      <section className="px-6 pb-16 pt-24">
        <div className="mx-auto max-w-[1600px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
            The Archive
          </p>
          <h1 className="mt-6 font-display text-6xl italic md:text-8xl">Available Works</h1>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Each work is a unique oil painting on linen or canvas, signed and documented. Shipping
            and crating arranged from the studio worldwide.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12 flex items-center justify-between border-b border-border pb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              {artworks.length} Works / 2023 — 2024
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Index
            </span>
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-2 lg:grid-cols-3">
            {artworks.map((w) => (
              <article key={w.slug} className="group">
                <div className="relative mb-5 aspect-[3/4] overflow-hidden ring-1 ring-border transition-all duration-500 group-hover:ring-primary/50">
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
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-background/0 p-5 opacity-0 transition-all duration-500 group-hover:bg-background/50 group-hover:opacity-100">
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
                      className="pointer-events-auto w-full translate-y-3 bg-primary py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary-foreground transition-transform duration-500 group-hover:translate-y-0"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] text-primary">{w.index}</span>
                    <Link
                      to="/works/$slug"
                      params={{ slug: w.slug }}
                      className="block truncate font-display text-2xl italic transition-colors hover:text-primary"
                    >
                      {w.title}
                    </Link>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {w.year} · {w.dimensions}
                    </p>
                  </div>
                  <span className="whitespace-nowrap font-mono text-xs">
                    {formatPrice(w.price)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
