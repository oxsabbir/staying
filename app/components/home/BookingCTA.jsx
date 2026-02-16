import Link from "next/link";

export default function BookingCTA() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-purple-900 py-12 text-white">
      <div className="container flex flex-col items-center gap-6 text-center">
        <div>
          <h2 className="text-3xl font-bold">Ready for Your Next Getaway?</h2>
          <p className="mt-2 text-lg text-white/90">
            Book your dream vacation rental today and create unforgettable
            memories.
          </p>
        </div>
        <a
          href="/places/riyadh"
          className="rounded-md bg-white px-6 py-3 font-semibold text-primary shadow-lg transition-transform hover:scale-105"
        >
          Explore Rooms
        </a>
      </div>
    </section>
  );
}
