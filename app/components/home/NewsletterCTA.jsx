export default function NewsletterCTA() {
  return (
    <section className="bg-primary py-8 text-white">
      <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-[1.35rem] font-semibold">
            Want to feel at home on your next adventure?
          </h2>
          <p className="mt-2 text-white/80">Discover vacation rentals</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <input
              className="min-w-[220px] rounded-xs bg-white px-3 py-2 text-text"
              placeholder="Enter your email"
            />
            <button className="rounded-xs bg-white px-3 py-2 font-semibold text-primary">
              Subscribe
            </button>
          </div>
        </div>
        <div className="h-40 w-56 rounded-full bg-[linear-gradient(120deg,#febb02,#ffffff)]" />
      </div>
    </section>
  );
}
