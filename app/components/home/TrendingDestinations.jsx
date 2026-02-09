import Link from "next/link";

const destinations = [
  {
    name: "Riyadh",
    link: "/places/riyadh",
    image: "/images/destinations/riyadh.jpg",
  },
  {
    name: "Jeddah",
    link: "/places/jeddah",
    image: "/images/destinations/jeddah.jpg",
  },
  {
    name: "Mecca",
    link: "/places/mecca",
    image: "/images/destinations/mecca.jpg",
  },
  {
    name: "Medina",
    link: "/places/medina",
    image: "/images/destinations/medina.jpg",
  },
  {
    name: "AlUla",
    link: "/places/alula",
    image: "/images/destinations/alula.jpg",
  },
  {
    name: "Tabuk",
    link: "/places/tabuk",
    image: "/images/destinations/tabuk.jpg",
  },
];

export default function TrendingDestinations() {
  return (
    <section className="py-8">
      <div className="container">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Trending destinations</h2>
          {/* <button className="text-link">See all</button> */}
        </div>
        <div className="grid grid-cols-4 gap-4 max-[960px]:grid-cols-2">
          {destinations.map((dest, index) => (
            <div
              key={dest.name}
              className={`relative overflow-hidden rounded-sm bg-cover bg-center ${
                index < 2
                  ? "col-span-2 h-[160px] md:h-[260px] max-[640px]:col-span-1"
                  : "h-[160px]"
              }`}
              style={{ backgroundImage: `url(${dest.image})` }}
            >
              <Link href={dest.link}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#00000084] to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white drop-shadow">
                  <h3 className="font-semibold">{dest.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
