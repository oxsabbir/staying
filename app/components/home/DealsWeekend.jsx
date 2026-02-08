import { FiHeart } from 'react-icons/fi';

export default function DealsWeekend({ items }) {
  return (
    <section className="py-8">
      <div className="container">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-[1.35rem] font-semibold">Deals for the weekend</h2>
          <span className="text-muted">Save 20% or more with early 2026 deals</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((card) => (
            <div key={card.name} className="overflow-hidden rounded-sm border border-border bg-bg">
              <div
                className="relative h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <span className="absolute left-2 top-2 rounded-xs bg-primary px-1.5 py-0.5 text-[0.7rem] text-white">
                  Genius
                </span>
                <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-muted">
                  <FiHeart />
                </button>
              </div>
              <div className="grid gap-2 p-4">
                <h3 className="font-semibold">{card.name}</h3>
                <p className="text-sm text-muted">{card.location}</p>
                <div className="text-xs font-semibold">2 nights · {card.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
