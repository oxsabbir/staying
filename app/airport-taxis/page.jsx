import {
  FiCheck,
  FiChevronDown,
  FiClock,
  FiLock,
  FiMapPin,
  FiNavigation,
  FiPhoneCall,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { HeaderNav, SiteFooter } from "../components/home";
import Accordion from "../components/shared/Accordion";
import AutocompleteInput from "../components/shared/AutocompleteInput";

const navLinks = [
  "Stays",
  "Flights",
  "Car rentals",
  "Attractions",
  "Airport taxis",
];

const featureCards = [
  {
    title: "Flight tracking",
    body: "Your driver will track your flight and wait if you're delayed.",
    icon: <FiNavigation />,
  },
  {
    title: "One clear price",
    body: "Your price is confirmed upfront — no extra costs, no cash required.",
    icon: <FiLock />,
  },
  {
    title: "Tried and true service",
    body: "We work with professional drivers and have 24/7 customer care.",
    icon: <FiShield />,
  },
];

const processSteps = [
  {
    title: "Booking your airport taxi",
    body: "Confirmation is immediate. Cancel for free up to 24 hours before pickup.",
    icon: <FiClock />,
  },
  {
    title: "Meeting your driver",
    body: "You’ll be met on arrival and taken to your vehicle. Your driver tracks your flight.",
    icon: <FiPhoneCall />,
  },
  {
    title: "Arriving at your destination",
    body: "Get to your destination quickly and safely — no long taxi lines.",
    icon: <FiMapPin />,
  },
];

const taxiCards = [
  {
    name: "Standard",
    subtitle: "Volkswagen Jetta or similar",
    passengers: "3 passengers",
    bags: "2 standard bags",
  },
  {
    name: "Full-size sedan",
    subtitle: "Mercedes-Benz E-Class or similar",
    passengers: "3 passengers",
    bags: "2 standard bags",
  },
];

const faqs = [
  {
    title: "What if my flight is early or delayed?",
    body: "We track your flight and adjust pick-up times automatically, so your driver is there when you land.",
  },
  {
    title: "What's included in the price?",
    body: "All taxes, fees, and meet & greet service are included. No hidden charges at pickup.",
  },
  {
    title: "How do I pay?",
    body: "Pay online with your card. The total price is confirmed upfront.",
  },
  {
    title: "Can I cancel my booking?",
    body: "Yes, free cancellation is available up to 24 hours before pickup.",
  },
];

const faqsLeft = faqs.slice(0, 2);
const faqsRight = faqs.slice(2);

export default function AirportTaxisPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <HeaderNav navLinks={navLinks} />

      <main className="container pb-16 pt-8 text-[15px] sm:text-[16px]">
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold">Book your airport taxi</h1>
          <p className="mt-2 text-base text-muted">
            Easy transportation between the airport and your accommodations
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-base">
            <label className="flex items-center gap-2">
              <input type="radio" name="trip" defaultChecked />
              One-way
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="trip" />
              Return
            </label>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-[1.1fr_1.1fr_0.9fr_0.9fr_0.5fr_auto]">
            <div className="flex items-center gap-2 rounded-md border border-accent px-3 py-2">
              <AutocompleteInput placeholder="Enter pick-up location" />
            </div>
            <div className="flex items-center gap-2 rounded-md border border-accent px-3 py-2">
              <AutocompleteInput placeholder="Enter destination" />
            </div>
            <div className="flex items-center gap-2 rounded-md border border-accent px-3 py-2 text-base text-muted">
              <FiClock className="text-primary" />
              Sat 14, Feb, 12:00
            </div>
            <div className="flex items-center gap-2 rounded-md border border-accent px-3 py-2 text-base text-muted">
              <FiClock className="text-primary" />
              Add a return
            </div>
            <div className="flex items-center gap-2 rounded-md border border-accent px-3 py-2 text-base">
              <FiUser className="text-primary" />
              2
              <FiChevronDown className="text-muted" />
            </div>
            <button className="rounded-md bg-link px-6 py-2 text-base font-semibold text-white">
              Search
            </button>
          </div>
        </section>

        <section className="mt-10 grid gap-6 text-base md:grid-cols-3">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="flex gap-4 rounded-lg bg-white p-4 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                {card.icon}
              </div>
              <div>
                <div className="font-semibold text-[15px]">{card.title}</div>
                <p className="mt-1 text-sm text-muted">{card.body}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Your account, your travel</h2>
          <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-lg border border-border bg-white p-4 md:flex-row md:items-center">
            <div>
              <div className="text-base font-semibold">
                All your trip details in one place
              </div>
              <p className="mt-1 text-sm text-muted">
                Sign in to book faster and manage your trip with ease
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <button className="rounded-md bg-link px-4 py-2 text-sm font-semibold text-white">
                  Sign in
                </button>
                <button className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-link">
                  Register
                </button>
              </div>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary text-sm font-semibold">
              Genius
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-center">
            Airport transportation made easy
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1fr]">
            <div className="space-y-4">
              {processSteps.map((step) => (
                <div
                  key={step.title}
                  className="flex gap-3 rounded-lg bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-base font-semibold">{step.title}</div>
                    <p className="mt-1 text-sm text-muted">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center rounded-lg border border-dashed border-border bg-subtle p-6 text-center text-base text-muted">
              How does it work? Book online → Receive confirmation → Meet your
              driver → Arrive
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">
            Airport taxis for any kind of trip
          </h2>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <button className="rounded-full border border-border px-3 py-1.5">
              1–3 passengers
            </button>
            <button className="rounded-full border border-border px-3 py-1.5">
              4–7 passengers
            </button>
            <button className="rounded-full border border-border px-3 py-1.5">
              All taxis
            </button>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {taxiCards.map((card) => (
              <div
                key={card.name}
                className="rounded-lg border border-border bg-white p-4 shadow-sm"
              >
                <div className="text-base font-semibold">{card.name}</div>
                <div className="text-sm text-muted">{card.subtitle}</div>
                <div className="mt-3 space-y-2 text-sm text-muted">
                  <div className="flex items-center gap-2">
                    <FiUser /> {card.passengers}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheck /> {card.bags}
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700">
                    <FiCheck /> Meet & greet included
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700">
                    <FiCheck /> Free cancellation
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">
            Learn more about our airport taxi service
          </h2>
          <p className="mt-2 text-sm text-muted">
            See more FAQs on our help page
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Accordion items={faqsLeft} />
            <Accordion items={faqsRight} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
