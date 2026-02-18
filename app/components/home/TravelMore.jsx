export default function TravelMore() {
  return (
    <section className="py-8">
      <div className="container flex flex-col justify-between gap-4 rounded-sm border border-border bg-bg p-5 md:flex-row md:items-center">
        <div>
          <h3 className="font-semibold">Travel more, spend less</h3>
          <p className="text-muted">
            Sign in, save money. Save 10% or more at participating properties.
          </p>
        </div>
        <div className="flex gap-2">
          <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}>
            <button className="rounded-sm bg-link px-4 py-2 text-sm font-semibold text-white">
              Call Us
            </button>
          </a>
          <button className="rounded-xs border border-primary px-3 py-2 text-sm font-semibold text-primary">
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
}
