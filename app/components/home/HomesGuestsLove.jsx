import { FiHeart } from 'react-icons/fi';

export default function HomesGuestsLove({ items }) {
  return (
    <section className="py-8">
      <div className="container">
        <h2 className="mb-4 text-[1.35rem] font-semibold">Homes guests love</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
                <h3 className="font-semibold">{card.name}</h3>
                <p className="text-sm text-muted">{card.location}</p>
                <div className="text-xs font-semibold">Starting from {card.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
