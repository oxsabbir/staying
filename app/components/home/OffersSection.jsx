const offers = [
  {
    title: "Find your next stay",
    body: "Search deals on hotels, homes, and much more...",
  },
  {
    title: "Get instant discounts",
    body: "Sign in to unlock Genius and member-only savings.",
  },
];

export default function OffersSection() {
  return (
    <section className="bg-subtle py-8">
      <div className="container grid gap-4">
        <div>
          <h2 className="text-[1.35rem] font-semibold">Offers</h2>
          <p className="text-muted">
            Promotions, deals, and special offers for you
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {offers.map((offer) => (
            <div
              key={offer.title}
              className="grid gap-3 rounded-sm border border-border bg-bg p-4"
            >
              <h3 className="font-semibold">{offer.title}</h3>
              <p className="text-muted">{offer.body}</p>
              <button className="w-fit rounded-xs bg-white px-3 py-2 font-semibold text-primary">
                Find stays
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
