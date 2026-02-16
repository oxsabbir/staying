import { HeaderNav, SiteFooter } from "../components/home";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-text">
      <HeaderNav />

      <main className="container py-10">
        <section className="rounded-lg bg-white p-6 shadow-sm md:p-8">
          <h1 className="text-3xl font-bold text-text md:text-4xl">
            About Staying.com
          </h1>
          <p className="mt-4 max-w-3xl text-base text-muted">
            Staying.com helps travelers discover trusted stays, airport taxis,
            flights, and car rentals in one place. We focus on clear pricing,
            practical booking flows, and reliable support before and after your
            trip.
          </p>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-white p-5">
            <h2 className="text-lg font-semibold">What we do</h2>
            <p className="mt-2 text-sm text-muted">
              We connect travelers with quality travel options and make booking
              faster with simple, mobile-friendly experiences.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-white p-5">
            <h2 className="text-lg font-semibold">Our approach</h2>
            <p className="mt-2 text-sm text-muted">
              We keep things transparent: straightforward details, useful trip
              information, and practical tools that are easy to use.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-white p-5">
            <h2 className="text-lg font-semibold">Support</h2>
            <p className="mt-2 text-sm text-muted">
              Whether you are planning ahead or booking last minute, our team
              is here to help with quick, responsive service.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
