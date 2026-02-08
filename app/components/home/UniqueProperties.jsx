import { FiHeart } from 'react-icons/fi';

export default function UniqueProperties({ items }) {
  return (
    <section className="py-8">
      <div className="container">
        <h2 className="text-[1.35rem] font-semibold">Stay at our top unique properties</h2>
        <p className="mt-2 text-muted">
          From castles and villas to boats and igloos, we have it all
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((card) => (
            <div key={card.name} className="overflow-hidden rounded-sm border border-border bg-bg">
              <div
                className="relative h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-muted">
                  <FiHeart />
                </button>
              </div>
              <div className="grid gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{card.name}</h3>
                </div>
                <p className="text-sm text-muted">{card.location}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-xs bg-primary px-1.5 py-0.5 text-white">{card.rating}</span>
                  <span>Very good</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
