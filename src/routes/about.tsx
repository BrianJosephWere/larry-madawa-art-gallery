import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import studio from "@/assets/studio.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Studio — Larry Madawa" },
      {
        name: "description",
        content:
          "About Larry Madawa — biography, studio practice, press, and acquisitions inquiries.",
      },
      { property: "og:title", content: "Studio — Larry Madawa" },
      { property: "og:image", content: studio },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteChrome>
      <section className="px-6 pt-24">
        <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="overflow-hidden ring-1 ring-border">
              <img
                src={studio}
                alt="Larry Madawa in his studio"
                width={1200}
                height={1500}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-5 lg:pt-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
              The Artist
            </p>
            <h1 className="mt-6 font-display text-5xl italic leading-tight md:text-7xl">
              Larry Madawa
            </h1>
            <div className="mt-12 space-y-6 text-sm leading-relaxed text-muted-foreground">
              <p>
                Larry Madawa is a contemporary portrait painter working between Nairobi and Lagos.
                His large-scale oil portraits reimagine the visual grammar of classical European
                portraiture by placing subjects from the African diaspora into postures of
                sovereignty, inheritance, and quiet authority.
              </p>
              <p>
                Trained at the Kenyatta University School of Visual Arts and the Slade in London,
                Madawa works exclusively in oil on linen, often incorporating gold leaf and
                hand-painted damask backgrounds drawn from West African and Edwardian textile
                traditions.
              </p>
              <p>
                His work has been shown at Circle Art Gallery, Gallery 1957, and Gagosian, and is
                held in private collections across Kenya, the United Kingdom, and the United States.
              </p>
            </div>

            <dl className="mt-16 divide-y divide-border border-y border-border font-mono text-xs">
              <Row label="Based" value="Nairobi · Lagos" />
              <Row label="Medium" value="Oil on linen, gold leaf" />
              <Row label="Representation" value="Studio direct" />
              <Row label="Inquiries" value="studio@larrymadawa.art" />
            </dl>
          </div>
        </div>
      </section>

      <section className="mt-40 border-t border-border px-6 py-24">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary md:col-span-3">
            Statement
          </p>
          <blockquote className="font-display text-3xl italic leading-tight md:col-span-9 md:text-5xl">
            “Portraiture is the slowest argument I know how to make. Each face I paint is a record —
            that we were here, that we were regal, that the frame has always belonged to us.”
          </blockquote>
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
