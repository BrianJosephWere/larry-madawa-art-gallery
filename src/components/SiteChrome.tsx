import { Link } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/artworks";

function Nav() {
  const { count, setOpen } = useCart();
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-xl italic tracking-tight">
          Larry Madawa
        </Link>
        <div className="hidden items-center gap-10 md:flex">
          <Link
            to="/works"
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
          >
            Works
          </Link>
          <Link
            to="/exhibitions"
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
          >
            Exhibitions
          </Link>
          <Link
            to="/about"
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
          >
            Studio
          </Link>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-2"
          aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] transition-colors group-hover:text-primary">
            Cart
          </span>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 font-mono text-[10px] font-bold text-primary-foreground">
            {count}
          </span>
        </button>
      </div>
    </nav>
  );
}

function CartDrawer() {
  const { items, open, setOpen, subtotal, remove } = useCart();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" aria-modal role="dialog">
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <aside className="animate-slide-in-right absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            Your Selection
          </span>
          <button
            onClick={() => setOpen(false)}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary"
            aria-label="Close cart"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <p className="font-display text-2xl italic text-muted-foreground">
              No works selected yet.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-4 py-5">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-28 w-20 flex-shrink-0 object-cover ring-1 ring-border"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h4 className="font-display text-lg italic leading-tight">
                        {item.title}
                      </h4>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {item.medium}
                      </p>
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="font-mono text-xs">
                        {formatPrice(item.price)}
                      </span>
                      <button
                        onClick={() => remove(item.slug)}
                        className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-6 py-6">
          <div className="mb-5 flex items-baseline justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Subtotal
            </span>
            <span className="font-display text-2xl">
              {formatPrice(subtotal)}
            </span>
          </div>
          <Link
            to="/checkout"
            onClick={() => setOpen(false)}
            aria-disabled={items.length === 0}
            className={`block w-full border border-primary py-4 text-center font-mono text-[11px] uppercase tracking-[0.3em] transition-all ${
              items.length === 0
                ? "pointer-events-none border-border text-muted-foreground"
                : "bg-primary text-primary-foreground hover:bg-transparent hover:text-primary"
            }`}
          >
            Proceed to Checkout
          </Link>
        </div>
      </aside>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-24">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-16 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            Newsletter
          </p>
          <h4 className="mb-6 font-display text-3xl italic">Join the archive</h4>
          <form
            className="flex border-b border-border"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Email Address"
              className="flex-1 bg-transparent py-2 font-mono text-[10px] uppercase outline-none placeholder:text-muted-foreground/40"
            />
            <button className="px-4 font-mono text-[10px] uppercase tracking-widest transition-colors hover:text-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="grid grid-cols-2 gap-12 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <div className="flex flex-col gap-4">
            <a href="#" className="transition-colors hover:text-primary">
              Instagram
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Artsy
            </a>
            <Link to="/about" className="transition-colors hover:text-primary">
              Press
            </Link>
          </div>
          <div className="flex flex-col gap-4 md:text-right">
            <span>Madawa Studio</span>
            <span>Nairobi / Lagos</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      {children}
      <Footer />
      <CartDrawer />
    </div>
  );
}
