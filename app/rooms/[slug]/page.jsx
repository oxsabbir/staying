import { notFound } from "next/navigation";
import RoomDetailsClient from "./RoomDetailsClient";
import { getPropertyBySlug, getPropertySlugs } from "@/api/property";

export async function generateStaticParams() {
  const slugs = await getPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function RoomPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const propertyData = await getPropertyBySlug(slug);

  if (!propertyData) {
    notFound();
  }

  const attr = propertyData.attributes || propertyData;

  // Transform dynamic data to match structure expected by UI components
  const property = {
    id: propertyData.id,
    slug: attr.slug || propertyData.documentId,
    name: attr.name,
    location: attr.address || attr.city?.name || "Saudi Arabia",
    highlight: attr.highlightMesssage,
    rating: attr.Rating || attr.rating || 0,
    ratingLabel: attr.ratingLabel,
    reviewCount: attr.totalReview || attr.reviewCount || 0,
    overview: attr.description,
    propertyDetails: attr.propertyDetails,
    facts: [
      { label: "Property Type", value: attr.propertyType },
      { label: "Deal Type", value: attr.dealType },
      { label: "Location", value: attr.address },
    ].filter((f) => f.value),
    amenities:
      attr.specialPerks?.map((p) => (typeof p === "string" ? p : p.item)) || [],
    finePrint:
      attr.finePrints?.map((p) => (typeof p === "string" ? p : p.item)) || [],
    mapLink:
      attr.city?.mapUrl ||
      `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115858.55598129202!2d46.5412574676527!3d24.8439775465249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d874173%3A0xa602845fc40e9dc7!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1715421234567!5m2!1sen!2sus`,
    images: [
      ...(attr.images?.map((img) => img.url || img.attributes?.url) || []),
    ].filter(Boolean),
    coverImage: attr.coverImage?.url || attr.coverImage?.data?.attributes?.url,
    basePrice: attr.price || 0,
    availability: {
      rooms: attr.rooms?.map((room) => ({
        type: room.roomType || room.type,
        beds: room.beds,
        perks:
          room.perks?.map((p) => (typeof p === "string" ? p : p.item)) || [],
        priceMultiplier: room.priceMultiplier || 1,
      })) || [
        {
          type: attr.propertyType || "Standard Room",
          beds: "1 extra-large double bed",
          perks: ["Free cancellation", "No prepayment needed"],
          priceMultiplier: 1,
        },
      ],
    },
  };

  return <RoomDetailsClient initialProperty={property} />;
}
