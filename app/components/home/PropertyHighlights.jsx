import { FiChevronRight } from 'react-icons/fi';

export default function PropertyHighlights({ items }) {
  return (
    <section className="py-8">
      <div className="container">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-[1.35rem] font-semibold">Still interested in these properties?</h2>
          <button className="flex items-center gap-1 text-link">
            See all <FiChevronRight />
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((card) => (
            <div
              key={card.name}
              className="overflow-hidden rounded-sm border border-border bg-bg shadow-1"
            >
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${card.image})` }}
              />
              <div className="p-4">
                <h3 className="font-semibold">{card.name}</h3>
                <p className="my-2 text-sm text-muted">{card.city}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-xs bg-primary px-1.5 py-0.5 text-white">8.7</span>
                  <span>Excellent · 1,247 reviews</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
