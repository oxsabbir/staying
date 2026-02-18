import Link from "next/link";

const serviceLinks = [
  { label: "Stays", href: "/" },
  { label: "Flights", href: "/flights" },
  { label: "Car rentals", href: "/cars" },
  { label: "Airport taxis", href: "/airport-taxis" },
];

const companyLinks = [{ label: "About Staying.com", href: "/about" }];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-border bg-white">
      <div className="container grid gap-8 py-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <h3 className="text-xl font-bold text-text">Staying.com</h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">
            Simple travel booking for stays, flights, car rentals, and airport
            taxis with quick support when you need it.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-text">
            Services
          </h4>
          <div className="mt-3 grid gap-2 text-sm">
            {serviceLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted hover:text-link"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-text">
            Company
          </h4>
          <div className="mt-3 grid gap-2 text-sm">
            {companyLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted hover:text-link"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-link"
            >
              WhatsApp Support
            </a>
            <a
              href="mailto:support@staying.com"
              className="text-muted hover:text-link"
            >
              support@staying.com
            </a>
            <a
              href={`tel:+${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
              className="text-muted hover:text-link"
            >
              +{process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_FORMATED}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/80">
        <div className="container py-4 text-xs text-muted">
          © {year} Staying.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
