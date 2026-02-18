import { FiMail, FiMapPin, FiMessageCircle, FiPhoneCall } from "react-icons/fi";
import { HeaderNav, SiteFooter } from "../components/home";

const quickContacts = [
  {
    title: "WhatsApp",
    value: `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_FORMATED}`,
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
    icon: FiMessageCircle,
  },
  {
    title: "Email",
    value: "support@staying.com",
    href: "mailto:support@staying.com",
    icon: FiMail,
  },
  {
    title: "Phone",
    value: `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_FORMATED}`,
    href: `tel:+${process.env.NEXT_PUBLIC_PHONE_NUMBER}`,
    icon: FiPhoneCall,
  },
  {
    title: "Location",
    value: "Riyadh, Saudi Arabia",
    href: "#",
    icon: FiMapPin,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f4f6fb] text-text">
      <HeaderNav />

      <main className="container py-8 sm:py-10">
        <section className="overflow-hidden rounded-2xl border border-[#d7e3ff] bg-gradient-to-br from-[#e9f1ff] via-[#f8fbff] to-[#eef4ff] p-5 sm:p-7 md:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-link/80">
            Contact Staying.com
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-[#13294b] sm:text-4xl">
            Need help with your booking?
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#496085] sm:text-base">
            Send us your request and our support team will get back to you as
            quickly as possible. For urgent assistance, contact us on WhatsApp.
          </p>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickContacts.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="group rounded-xl border border-border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg  text-link">
                <item.icon size={24} />
              </div>
              <p className="mt-3 text-sm font-semibold text-text">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-muted">{item.value}</p>
            </a>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-semibold">Send us a message</h2>
          <p className="mt-1 text-sm text-muted">
            Fill this form and we will respond shortly.
          </p>

          <form className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm font-medium text-text">Full name</span>
              <input
                type="text"
                placeholder="Your name"
                className="rounded-lg border border-border bg-[#fbfcff] px-3 py-2.5 text-sm outline-none transition focus:border-link"
                required
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-medium text-text">Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                className="rounded-lg border border-border bg-[#fbfcff] px-3 py-2.5 text-sm outline-none transition focus:border-link"
                required
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-medium text-text">Phone</span>
              <input
                type="tel"
                placeholder="+966..."
                className="rounded-lg border border-border bg-[#fbfcff] px-3 py-2.5 text-sm outline-none transition focus:border-link"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-medium text-text">Subject</span>
              <input
                type="text"
                placeholder="Booking support"
                className="rounded-lg border border-border bg-[#fbfcff] px-3 py-2.5 text-sm outline-none transition focus:border-link"
                required
              />
            </label>

            <label className="grid gap-1 md:col-span-2">
              <span className="text-sm font-medium text-text">Message</span>
              <textarea
                rows={5}
                placeholder="Tell us how we can help..."
                className="rounded-lg border border-border bg-[#fbfcff] px-3 py-2.5 text-sm outline-none transition focus:border-link"
                required
              />
            </label>

            <button
              type="submit"
              className="rounded-lg bg-link px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#005dc1] md:w-fit"
            >
              Send message
            </button>
          </form>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
