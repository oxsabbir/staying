import { places } from "./places";

const generateRoomDetails = () => {
  const allDetails = {};

  places.forEach((place) => {
    place.properties.forEach((prop) => {
      // Basic data mapping
      const detail = {
        slug: prop.id,
        name: prop.name,
        location: `${prop.area}, ${place.name}, ${place.country}`,
        rating: String(prop.rating),
        ratingLabel: prop.ratingLabel,
        reviewCount: prop.reviewCount.toLocaleString(),
        highlight: `A popular ${prop.ratingLabel.toLowerCase()} choice in ${prop.area}.`,
        images: [{ src: prop.image, alt: `Main view of ${prop.name}` }],
        overview: prop.description,
        facts: [
          { label: "Best for", value: "City trips, business travelers" },
          {
            label: "Breakfast",
            value: prop.breakfastIncluded ? "Included" : "Available",
          },
          { label: "Location score", value: `${prop.locationScore}/10` },
        ],
        amenities: [
          "Free WiFi",
          "Room service",
          "24-hour front desk",
          ...prop.perks,
        ],
        availability: {
          checkIn: "Wed, Mar 5",
          checkOut: "Fri, Mar 7",
          guests: "2 adults · 1 room",
          rooms: [
            {
              type: prop.type,
              beds: prop.beds,
              price: `SAR ${prop.price.toLocaleString()}`,
              perks: prop.perks,
            },
            {
              type: "Standard Double Room",
              beds: "1 large double bed",
              price: `SAR ${(prop.price * 0.8).toLocaleString()}`,
              perks: ["Free cancellation"],
            },
            {
              type: "Executive Suite",
              beds: "1 extra-large double bed",
              price: `SAR ${(prop.price * 1.5).toLocaleString()}`,
              perks: ["Free cancellation", "Breakfast included", "City view"], // Added City view
            },
          ],
        },
        finePrint: [
          "Check-in from 3:00 PM",
          "Check-out until 12:00 PM",
          "ID and a credit card are required at check-in",
          "Pets are not allowed",
        ],
      };

      // Special image requirement for the first property
      if (prop.id === "four-seasons-riyadh") {
        detail.images = [
          {
            src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
            alt: "Luxury hotel room with city view",
          },
          {
            src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
            alt: "Hotel lobby with grand staircase",
          },
          {
            src: "https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?auto=format&fit=crop&w=800&q=80",
            alt: "Outdoor pool area at night",
          },
          {
            src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
            alt: "Fine dining restaurant setup",
          },
          {
            src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
            alt: "Spacious hotel spa and wellness center",
          },
          {
            src: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=800&q=80",
            alt: "Hotel exterior against a clear sky",
          },
        ];
      }

      allDetails[prop.id] = detail;
    });
  });
  return allDetails;
};

export const roomDetailsData = generateRoomDetails();

export const getRoomDetailsBySlug = (slug) => {
  return roomDetailsData[slug] || null;
};

export const roomSections = [
  {
    title: "Travelers are asking",
    items: [
      "Is the pool open year-round?",
      "Do you offer airport pick-up?",
      "Are cribs available for infants?",
      "What are the check-in/check-out times?",
    ],
  },
  {
    title: "Facilities",
    items: [
      "Free WiFi in all areas",
      "Fitness center",
      "Business lounge",
      "Laundry service",
      "Meeting/banquet facilities",
    ],
  },
  {
    title: "House rules",
    items: [
      "No smoking in rooms",
      "Pets are generally not allowed (check with hotel)",
      "Quiet hours may apply in the evenings",
    ],
  },
];
