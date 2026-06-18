import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "../lib/cart";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
          404
        </p>
        <h1 className="mt-6 font-display text-6xl italic">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The work you're looking for has been moved or never existed.
        </p>
        <Link
          to="/"
          className="mt-10 inline-block border border-primary px-8 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl italic">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong. Try again or return home.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-primary bg-primary px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-border px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Larry Madawa — Contemporary Portraiture" },
      {
        name: "description",
        content:
          "The studio of Larry Madawa. Large-scale contemporary oil portraiture exploring African identity, regality, and inheritance. Available works and exhibitions.",
      },
      { name: "author", content: "Larry Madawa Studio" },
      { property: "og:title", content: "Larry Madawa — Contemporary Portraiture" },
      {
        property: "og:description",
        content:
          "Large-scale contemporary oil portraiture exploring African identity, regality, and inheritance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Outlet />
      </CartProvider>
    </QueryClientProvider>
  );
}
