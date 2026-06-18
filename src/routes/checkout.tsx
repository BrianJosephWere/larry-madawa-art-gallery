import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteChrome } from "@/components/SiteChrome";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/artworks";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Larry Madawa" },
      { name: "description", content: "Complete your acquisition." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

type Method = "card" | "paypal" | "mpesa";

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState<Method>("card");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping = items.length > 0 ? 450 : 0;
  const total = subtotal + shipping;

  const orderRef = useMemo(
    () => `LMW-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    [],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    if (method === "card") {
      const number = String(form.get("cardNumber") || "").replace(/\s+/g, "");
      if (!/^\d{12,19}$/.test(number)) {
        setError("Enter a valid card number.");
        return;
      }
    }
    if (method === "mpesa") {
      const phone = String(form.get("mpesaPhone") || "").trim();
      if (!/^(\+?254|0)7\d{8}$/.test(phone)) {
        setError("Enter a valid Safaricom number (e.g. 07XXXXXXXX).");
        return;
      }
    }

    setSubmitting(true);
    // Simulate processing
    await new Promise((r) => setTimeout(r, 1100));
    setSubmitting(false);
    clear();
    navigate({
      to: "/order-confirmed",
      search: { ref: orderRef, method },
    });
  };

  if (items.length === 0) {
    return (
      <SiteChrome>
        <div className="mx-auto max-w-2xl px-6 py-40 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
            Checkout
          </p>
          <h1 className="mt-6 font-display text-5xl italic">
            Your cart is empty
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Begin by selecting a work from the archive.
          </p>
          <Link
            to="/works"
            className="mt-10 inline-block border border-primary px-8 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Browse Works
          </Link>
        </div>
      </SiteChrome>
    );
  }

  return (
    <SiteChrome>
      <section className="px-6 pb-8 pt-20">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
            Acquisition / {orderRef}
          </p>
          <h1 className="mt-6 font-display text-5xl italic md:text-7xl">
            Checkout
          </h1>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-12 lg:col-span-7"
            noValidate
          >
            <Fieldset legend="Contact">
              <Field name="email" label="Email" type="email" required />
              <Field name="name" label="Full name" required />
            </Fieldset>

            <Fieldset legend="Shipping Address">
              <Field name="address" label="Street" required />
              <div className="grid grid-cols-2 gap-3">
                <Field name="city" label="City" required />
                <Field name="country" label="Country" required defaultValue="Kenya" />
              </div>
            </Fieldset>

            <Fieldset legend="Payment Method">
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: "card", label: "Card" },
                    { id: "paypal", label: "PayPal" },
                    { id: "mpesa", label: "M-Pesa" },
                  ] as { id: Method; label: string }[]
                ).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={`border py-4 font-mono text-[11px] uppercase tracking-[0.25em] transition-all ${
                      method === m.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="pt-4">
                {method === "card" && (
                  <div className="space-y-3">
                    <Field
                      name="cardNumber"
                      label="Card number"
                      placeholder="4242 4242 4242 4242"
                      inputMode="numeric"
                      required
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Field name="cardExp" label="Expiry (MM/YY)" placeholder="12/27" required />
                      <Field name="cardCvc" label="CVC" placeholder="123" inputMode="numeric" required />
                    </div>
                  </div>
                )}
                {method === "paypal" && (
                  <div className="border border-border bg-card p-6">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      PayPal
                    </p>
                    <p className="mt-2 text-sm">
                      You'll be redirected to PayPal to authorize the payment of{" "}
                      <span className="text-primary">{formatPrice(total)}</span> after placing the order.
                    </p>
                  </div>
                )}
                {method === "mpesa" && (
                  <div className="space-y-3">
                    <div className="border border-border bg-card p-6">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        M-Pesa STK Push
                      </p>
                      <p className="mt-2 text-sm">
                        Enter your Safaricom number. You'll receive a prompt for{" "}
                        <span className="text-primary">
                          {formatPrice(total, "KES")}
                        </span>
                        .
                      </p>
                    </div>
                    <Field
                      name="mpesaPhone"
                      label="Safaricom number"
                      placeholder="07XX XXX XXX"
                      inputMode="tel"
                      required
                    />
                  </div>
                )}
              </div>
            </Fieldset>

            {error && (
              <p className="border border-destructive/40 bg-destructive/10 p-4 font-mono text-xs text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full border border-primary bg-primary py-5 font-mono text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary disabled:opacity-60"
            >
              {submitting
                ? "Processing…"
                : `Place Order · ${formatPrice(total)}`}
            </button>
            <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Demo checkout — no real payment is processed.
            </p>
          </form>

          {/* Summary */}
          <aside className="lg:col-span-5">
            <div className="sticky top-24 border border-border bg-card p-8">
              <h2 className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
                Order Summary
              </h2>
              <ul className="divide-y divide-border">
                {items.map((i) => (
                  <li key={i.slug} className="flex gap-4 py-5">
                    <img
                      src={i.image}
                      alt={i.title}
                      loading="lazy"
                      className="h-24 w-20 flex-shrink-0 object-cover ring-1 ring-border"
                    />
                    <div className="flex-1">
                      <h3 className="font-display text-lg italic leading-tight">
                        {i.title}
                      </h3>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {i.medium}
                      </p>
                      <p className="mt-3 font-mono text-xs">
                        {formatPrice(i.price)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-2 border-t border-border pt-6 font-mono text-xs">
                <Line label="Subtotal" value={formatPrice(subtotal)} />
                <Line label="Crating & shipping" value={formatPrice(shipping)} />
                <Line
                  label="Total"
                  value={formatPrice(total)}
                  emphasis
                />
                {method === "mpesa" && (
                  <p className="pt-2 text-right text-muted-foreground">
                    ≈ {formatPrice(total, "KES")}
                  </p>
                )}
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </SiteChrome>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-5 font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
        {legend}
      </legend>
      <div className="space-y-3">{children}</div>
    </fieldset>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
  inputMode,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        inputMode={inputMode}
        defaultValue={defaultValue}
        maxLength={120}
        className="w-full border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}

function Line({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex justify-between ${
        emphasis ? "border-t border-border pt-3 text-base" : ""
      }`}
    >
      <dt className="uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className={emphasis ? "font-display text-2xl not-italic text-foreground" : ""}>
        {value}
      </dd>
    </div>
  );
}
