import { FiCheckCircle, FiShield, FiPhoneCall, FiStar } from "react-icons/fi";
import {
  HeaderNav,
  HeroSearch,
  WhyBooking,
  PropertyHighlights,
  OffersSection,
  TrendingDestinations,
  UniqueProperties,
  DealsWeekend,
  HomesGuestsLove,
  NewsletterCTA,
  TravelMore,
  PopularBangladesh,
  SiteFooter,
} from "./components/home";
import customerSupport from "../public/images/CustomerSupport.png";
import freeCancellation from "../public/images/FreeCancellation.png";
import reviews from "../public/images/Reviews.png";
import tripsGlobe from "../public/images/TripsGlobe.png";

const navLinks = [
  "Stays",
  "Flights",
  "Flight + Hotel",
  "Car rentals",
  "Attractions",
  "Airport taxis",
];

const whyCards = [
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

const propertyCards = [
  {
    name: "Hotel Shanker-Palatial Heritage",
    city: "Kathmandu",
    image:
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb2108e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "The Dwarika's",
    city: "Kathmandu",
    image:
      "https://images.unsplash.com/photo-1470167290877-7d5d3446de4c?auto=format&fit=crop&w=800&q=80",
  },
];

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

const uniqueProps = [
  {
    name: "Hotel Shanker-Palatial Heritage",
    location: "Kathmandu, Nepal",
    rating: "8.2",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "The Dwarika's",
    location: "Kathmandu, Nepal",
    rating: "9.1",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Temple Tree Resort & Spa",
    location: "Pokhara, Nepal",
    rating: "8.9",
    image:
      "https://images.unsplash.com/photo-1496412705862-e0088f16f791?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Veranda High Resort Chiang Mai",
    location: "Chiang Mai, Thailand",
    rating: "8.7",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  },
];

const deals = [
  {
    name: "Hotel Omni Residency Dhaka",
    location: "Dhaka, Bangladesh",
    price: "BDT 10,210",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Empyrean Dhaka City Centre",
    location: "Dhaka, Bangladesh",
    price: "BDT 12,990",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Marco Polo Dhaka",
    location: "Dhaka, Bangladesh",
    price: "BDT 8,670",
    image:
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Hotel West Valley - Baridhara",
    location: "Dhaka, Bangladesh",
    price: "BDT 9,540",
    image:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=80",
  },
];

const homes = [
  {
    name: "Apartment Soffio Milano",
    location: "Milan, Italy",
    price: "BDT 12,602",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Lemon Lodge",
    location: "Tenerife, Spain",
    price: "BDT 21,381",
    image:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "7Seasons Apartments Budapest",
    location: "Budapest, Hungary",
    price: "BDT 17,116",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Villa Domina",
    location: "Split, Croatia",
    price: "BDT 7,832",
    image:
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <HeaderNav navLinks={navLinks} />
      <HeroSearch />
      <WhyBooking cards={whyCards} />
      <PropertyHighlights items={propertyCards} />
      <OffersSection offers={offers} />
      <TrendingDestinations />
      <UniqueProperties items={uniqueProps} />
      <DealsWeekend items={deals} />
      <HomesGuestsLove items={homes} />
      <NewsletterCTA />
      <TravelMore />
      <PopularBangladesh />
      <SiteFooter />
    </div>
  );
}
