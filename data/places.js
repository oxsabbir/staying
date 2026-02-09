export const places = [
  {
    slug: "riyadh",
    name: "Riyadh",
    country: "Saudi Arabia",
    region: "Riyadh Province",
    search: {
      checkIn: "Sun, Mar 1",
      checkOut: "Wed, Mar 4",
      guests: "2 adults · 0 children · 1 room",
    },
    summary: {
      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115942.82518364632!2d46.626978!3d24.713552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f02d8a7b7cdbb%3A0x6e3f8f6b1f2a8d9e!2sRiyadh!5e0!3m2!1sen!2ssa!4v1700000000004",
    },
  },
  {
    slug: "jeddah",
    name: "Jeddah",
    country: "Saudi Arabia",
    region: "Makkah Province",
    summary: {
      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118185.56361522862!2d39.153383!3d21.543333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d008a57a7d55%3A0x6bfcf2e4e7c0a7e9!2sJeddah!5e0!3m2!1sen!2ssa!4v1700000000005",
    },
  },
  {
    slug: "mecca",
    name: "Mecca",
    country: "Saudi Arabia",
    region: "Makkah Province",
    summary: {
      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118032.67378576094!2d39.826168!3d21.422487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c204b5f4c9a4f5%3A0x5f6c7c7e5f8a9c4b!2sMecca!5e0!3m2!1sen!2ssa!4v1700000000006",
    },
  },
  {
    slug: "medina",
    name: "Medina",
    country: "Saudi Arabia",
    region: "Al Madinah Province",
    summary: {
      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116613.97531854198!2d39.569184!3d24.524654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15bdbe5197dc7f51%3A0x52d3bfa1a2d7c8e5!2sMedina!5e0!3m2!1sen!2ssa!4v1700000000007",
    },
  },
  {
    slug: "alula",
    name: "AlUla",
    country: "Saudi Arabia",
    region: "Al Madinah Province",
    summary: {
      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121781.59316299874!2d37.920783!3d26.608531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15ae5d6b6e9c5d8d%3A0x7c4a9f2c8d1b6e5a!2sAlUla!5e0!3m2!1sen!2ssa!4v1700000000008",
    },
  },
  {
    slug: "tabuk",
    name: "Tabuk",
    country: "Saudi Arabia",
    region: "Tabuk Province",
    summary: {
      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124006.24671943687!2d36.553923!3d28.383818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15ab1c0f7a7d5e5f%3A0x4c6d9e8b7f1a2c3d!2sTabuk!5e0!3m2!1sen!2ssa!4v1700000000009",
    },
  },
];

export const getPlaceBySlug = (slug) =>
  places.find((place) => place.slug === slug);

export const getPlaceSlugs = () => places.map((place) => place.slug);
