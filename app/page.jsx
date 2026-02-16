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
  PopularSaudiDestinations,
  SiteFooter,
} from "./components/home";

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
      <NewsletterCTA />
      <TravelMore />
      <PopularSaudiDestinations />
      <SiteFooter />
    </div>
  );
}
