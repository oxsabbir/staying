import { places } from "./places";
import { roomData } from "./room_data";

const generateRoomDetails = () => {
  const allDetails = {};

  places.forEach((place) => {
    roomData.forEach((prop) => {
      // Basic data mapping
      const detail = {
        slug: prop.id,
        name: prop.name,
        location: `${prop.area}, ${place.name}, ${place.country}`,
        rating: String(prop.rating),
        ratingLabel: prop.ratingLabel,
        reviewCount: prop.reviewCount.toLocaleString(),
        highlight: `A popular ${prop.ratingLabel.toLowerCase()} choice in ${prop.area}.`,
        images: prop.image,
        basePrice: prop.price,
        overview: prop.description,
        mapLink: prop.mapLink,
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
              priceMultiplier: 1,
              price: `SAR ${prop.price.toLocaleString()}`,
              perks: prop.perks,
            },
            {
              type: "Standard Double Room",
              beds: "1 large double bed",
              priceMultiplier: 0.8,
              price: `SAR ${(prop.price * 0.8).toLocaleString()}`,
              perks: ["Free cancellation"],
            },
            {
              type: "Executive Suite",
              beds: "1 extra-large double bed",
              priceMultiplier: 1.5,
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
