import customerSupport from "../../../public/images/CustomerSupport.png";
import freeCancellation from "../../../public/images/FreeCancellation.png";
import reviews from "../../../public/images/Reviews.png";
import tripsGlobe from "../../../public/images/TripsGlobe.png";

const cards = [
  {
    title: "Book now, pay at the property",
    body: "FREE cancellation on most rooms",
    image: freeCancellation,
  },
  {
    title: "300M+ reviews from fellow travelers",
    body: "Get trusted information from guests like you",
    image: reviews,
  },
  {
    title: "2+ million properties worldwide",
    body: "Hotels, guest houses, apartments, and more",
    image: tripsGlobe,
  },
  {
    title: "Trusted 24/7 customer service",
    body: "We're always here to help",
    image: customerSupport,
  },
];

export default function WhyBooking() {
  return (
    <section className="py-8 pt-[250px] xl:pt-16">
      <div className="container">
        <h2 className="mb-4 text-[1.35rem] font-semibold">Why Staying.com?</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="grid gap-3 rounded-md border border-border bg-[#f1f1f1] p-5 shadow-sm"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-md  text-link text-xl">
                <img
                  src={card.image.src}
                  alt={card.title}
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h3 className="text-base font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-muted">{card.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
