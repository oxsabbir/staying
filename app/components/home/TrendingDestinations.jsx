const destinations = [
  {
    name: "Riyadh",
    image:
      "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Jeddah",
    image:
      "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Mecca",
    image:
      "https://images.unsplash.com/photo-1532285195600-1c504063a868?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Medina",
    image:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "AlUla",
    image:
      "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?auto=format&fit=crop&w=900&q=80",
  },
];

export default function TrendingDestinations() {
  return (
    <section className="py-8">
      <div className="container">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-[1.35rem] font-semibold">
            Trending destinations
          </h2>
          <button className="text-link">See all</button>
        </div>
        <div className="grid grid-cols-4 gap-4 max-[960px]:grid-cols-2">
          {destinations.map((dest, index) => (
            <div
              key={dest.name}
              className={`relative overflow-hidden rounded-sm bg-cover bg-center ${
                index < 2
                  ? "col-span-2 h-[260px] max-[640px]:col-span-1"
                  : "h-[160px]"
              }`}
              style={{ backgroundImage: `url(${dest.image})` }}
            >
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white drop-shadow">
                <h3 className="font-semibold">{dest.name}</h3>
                <span className="h-3 w-5 rounded-[2px] bg-[linear-gradient(90deg,#d32f2f_0_50%,#f5f5f5_50%_100%)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
