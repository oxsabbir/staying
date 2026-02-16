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
  BookingCTA,
  TravelMore,
  PopularSaudiDestinations,
  SiteFooter,
} from "./components/home";

export const metadata = {
  title: "Find Your Next Stay",
  description:
    "Discover top stays, travel deals, and trusted booking options across Saudi Arabia with Staying.com.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <HeaderNav />
      <HeroSearch />
      <WhyBooking />
      <PropertyHighlights />
      <OffersSection />
      <TrendingDestinations />
      <UniqueProperties />
      <DealsWeekend />
      <HomesGuestsLove />
      <BookingCTA />
      <TravelMore />
      <PopularSaudiDestinations />
      <SiteFooter />
    </div>
  );
}
