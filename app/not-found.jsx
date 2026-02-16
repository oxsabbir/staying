import Link from "next/link";
import { HeaderNav, SiteFooter } from "./components/home";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f4f7ff] text-text">
      <HeaderNav />

      <main className="container py-12 sm:py-16">
        <section className="mx-auto max-w-3xl rounded-2xl border border-[#d7e3ff] bg-white p-6 text-center shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-link/80">
            Error 404
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-[#122b50] sm:text-4xl">
            Page not found
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">
            The page you are looking for does not exist or may have been moved.
            Use the links below to get back to your booking flow.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-lg bg-link px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#005dc1]"
            >
              Go to Home
            </Link>
            <Link
              href="/cars"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-text transition hover:border-link hover:text-link"
            >
              Book a Car
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-text transition hover:border-link hover:text-link"
            >
              Contact Support
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
