import { notFound } from "next/navigation";
import { HeaderNav, SiteFooter } from "../../components/home";
import PlacesClient from "../../components/places/PlacesClient";
import { getPlaceBySlug, getPlaceSlugs } from "../../../data/places";

const navLinks = [
  "Stays",
  "Flights",
  "Flight + Hotel",
  "Car rentals",
  "Attractions",
  "Airport taxis",
];

export function generateStaticParams() {
  return getPlaceSlugs().map((slug) => ({ slug }));
}

export default async function PlacePage({ params }) {
  const decodedParams = await params;
  const place = getPlaceBySlug(decodedParams.slug);

  if (!place) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      <HeaderNav navLinks={navLinks} />
      <PlacesClient place={place} totalProperties={place} />
      <SiteFooter />
    </div>
  );
}
