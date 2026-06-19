import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import { fetchArtwork, fetchArtworks, formatPrice } from "@/lib/artworks";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/works/$slug")({
  loader: async ({ params }) => {
    const work = await fetchArtwork(params.slug);
    if (!work) throw notFound();
    const list = await fetchArtworks();
    const related = list.filter((a) => a.slug !== work.slug).slice(0, 3);
    return { work, related };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.work.title} — Larry Madawa` },
          {
            name: "description",
            content: loaderData.work.description,
          },
          {
            property: "og:title",
            content: `${loaderData.work.title} — Larry Madawa`,
          },
          { property: "og:description", content: loaderData.work.description },
          { property: "og:image", content: loaderData.work.image },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:image", content: loaderData.work.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteChrome>
      <div className="px-6 py-40 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">404</p>
        <h1 className="mt-4 font-display text-5xl italic">Work not found</h1>
        <Link
          to="/works"
          className="mt-10 inline-block border border-primary px-8 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary"
        >
          Back to Works
        </Link>
      </div>
    </SiteChrome>
  ),
  errorComponent: ({ reset }) => (
    <SiteChrome>
      <div className="px-6 py-40 text-center">
        <h1 className="font-display text-3xl italic">Couldn't load this work</h1>
        <button
          onClick={reset}
          className="mt-8 border border-primary px-8 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary"
        >
          Try again
        </button>
      </div>
    </SiteChrome>
  ),
  component: WorkDetail,
});

function WorkDetail() {
  const { work, related } = Route.useLoaderData();
  const { add, setOpen, items } = useCart();
  const inCart = items.some((i) => i.slug === work.slug);

  return (
    <SiteChrome>
      <article className="px-6 pt-12">
        <div className="mx-auto max-w-[1600px]">
          <Link
            to="/works"
            className="mb-12 inline-block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary"
          >
            ← All Works
          </Link>

          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="overflow-hidden ring-1 ring-border">
                <img
                  src={work.image}
                  alt={work.title}
                  width={900}
                  height={1200}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-5 lg:pt-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
                {work.index} / {work.year}
              </p>
              <h1 className="mt-6 font-display text-5xl italic leading-tight md:text-7xl">
                {work.title}
              </h1>

              <dl className="mt-12 divide-y divide-border border-y border-border font-mono text-xs">
                <Row label="Medium" value={work.medium} />
                <Row label="Dimensions" value={work.dimensions} />
                <Row label="Year" value={String(work.year)} />
                {work.edition && <Row label="Edition" value={work.edition} />}
                <Row label="Price" value={formatPrice(work.price)} />
              </dl>

              <p className="mt-12 max-w-md text-sm leading-relaxed text-muted-foreground">
                {work.description}
              </p>

              <div className="mt-12 flex flex-col gap-3">
                <button
                  onClick={() => {
                    add({
                      slug: work.slug,
                      title: work.title,
                      price: work.price,
                      image: work.image,
                      medium: work.medium,
                    });
                    setOpen(true);
                  }}
                  disabled={inCart}
                  className="w-full border border-primary bg-primary py-5 font-mono text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {inCart ? "In your cart" : `Acquire — ${formatPrice(work.price)}`}
                </button>
                <a
                  href="mailto:studio@larrymadawa.art"
                  className="w-full border border-border py-5 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Inquire about this work
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="mt-40 border-t border-border px-6 py-24">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="mb-12 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Continue Browsing
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} to="/works/$slug" params={{ slug: r.slug }} className="group">
                <div className="mb-4 aspect-[3/4] overflow-hidden ring-1 ring-border transition-all group-hover:ring-primary/50">
                  <img
                    src={r.image}
                    alt={r.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-xl italic">{r.title}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {r.medium}, {r.year}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-3">
      <dt className="uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
