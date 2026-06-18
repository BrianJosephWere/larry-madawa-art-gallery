import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";

type Search = { ref?: string; method?: "card" | "paypal" | "mpesa" };

export const Route = createFileRoute("/order-confirmed")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ref: typeof s.ref === "string" ? s.ref : undefined,
    method:
      s.method === "card" || s.method === "paypal" || s.method === "mpesa"
        ? s.method
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order Confirmed — Larry Madawa" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderConfirmed,
});

const methodLabel: Record<"card" | "paypal" | "mpesa", string> = {
  card: "Card",
  paypal: "PayPal",
  mpesa: "M-Pesa",
};

function OrderConfirmed() {
  const { ref, method } = Route.useSearch();
  return (
    <SiteChrome>
      <div className="mx-auto max-w-2xl px-6 py-40 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
          Acquisition Confirmed
        </p>
        <h1 className="mt-6 font-display text-5xl italic md:text-7xl">
          Thank you.
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Your order has been received. The studio will reach out within 48
          hours to coordinate crating, shipping, and documentation.
        </p>

        <dl className="mx-auto mt-12 max-w-sm divide-y divide-border border-y border-border font-mono text-xs">
          <Row label="Reference" value={ref ?? "—"} />
          <Row label="Method" value={method ? methodLabel[method] : "—"} />
          <Row label="Status" value="Pending studio review" />
        </dl>

        <div className="mt-12 flex justify-center gap-3">
          <Link
            to="/works"
            className="border border-primary bg-primary px-8 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary-foreground"
          >
            Continue Browsing
          </Link>
          <Link
            to="/"
            className="border border-border px-8 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:border-primary hover:text-primary"
          >
            Home
          </Link>
        </div>
      </div>
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
