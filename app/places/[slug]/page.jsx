import { notFound } from "next/navigation";
import { HeaderNav, SiteFooter } from "../../components/home";
import PlacesClient from "../../components/places/PlacesClient";
import { getCityBySlug, getCitySlugs } from "@/api/city";
import { getPropertiesByCity } from "@/api/property";

const navLinks = [
  "Stays",
  "Flights",
  "Flight + Hotel",
  "Car rentals",
  "Attractions",
  "Airport taxis",
];

export async function generateStaticParams() {
  const slugs = await getCitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PlacePage({ params }) {
  const { slug } = await params;

  // Fetch city info and properties from API
  const [cityData, propertiesData] = await Promise.all([
    getCityBySlug(slug),
    getPropertiesByCity(slug),
  ]);

  if (!cityData) {
    notFound();
  }

  // Format the city data to match what PlacesClient expects
  const place = {
    ...cityData,
    name: cityData.name || cityData.attributes?.name,
    slug: cityData.slug || cityData.attributes?.slug,
    country: cityData.country || cityData.attributes?.country || "Saudi Arabia",
    region: cityData.region || cityData.attributes?.region || "Middle East",
    summary: {
      mapLink:
        cityData.mapUrl ||
        cityData.attributes?.mapUrl ||
        `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115858.55598129202!2d46.5412574676527!3d24.8439775465249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d874173%3A0xa602845fc40e9dc7!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1715421234567!5m2!1sen!2sus`,
    },
  };

  // Format properties to match the component's expectations
  const properties = propertiesData.map((p) => {
    const attr = p.attributes || p;
    return {
      id: p.id,
      slug: attr.slug || p.documentId || p.id,
      name: attr.name,
      price: attr.price || 0,
      oldPrice: attr.discountPrice,
      rating: attr.Rating || attr.rating || 0,
      ratingLabel: attr.ratingLabel,
      reviewCount: attr.totalReview || attr.reviewCount || 0,
      distance: attr.distance,
      area: attr.address,
      type: attr.propertyType || attr.type,
      dealLabel: attr.dealType || attr.dealLabel,
      breakfastIncluded: attr.breakfast,
      perks:
        attr.specialPerks?.map((item) =>
          typeof item === "string" ? item : item.item,
        ) || [],
      image: [
        attr.coverImage?.url || attr.coverImage?.data?.attributes?.url,
        ...(attr.images?.map((img) => img.url || img.attributes?.url) || []),
      ].filter(Boolean),
      rank: attr.rank || 0,
    };
  });

  return (
    <div className="min-h-screen bg-bg text-text">
      <HeaderNav navLinks={navLinks} />
      <PlacesClient place={place} initialProperties={properties} />
      <SiteFooter />
    </div>
  );
}
