import api from "@/lib/api";

export const fetchCities = async () => {
  const res = await api.get(
    "/landing-page?populate[featuredCity][populate]=coverImage",
  );
  return res.data.data;
};

export const fetchRecommendedProperties = async () => {
  const res = await api.get(
    "/landing-page?populate[recommendedProperty][populate]=*",
  );
  return res.data.data?.recommendedProperty || [];
};

export const fetchUniqueProperties = async () => {
  const res = await api.get(
    "/landing-page?populate[uniqueProperty][populate]=*",
  );
  return res.data.data?.uniqueProperty || [];
};

export const fetchWeekendDeals = async () => {
  const res = await api.get(
    "/landing-page?populate[weekendDeals][populate]=*",
  );
  return res.data.data?.weekendDeals || [];
};

export const fetchHomesGuestsLove = async () => {
  const res = await api.get(
    "/landing-page?populate[homeGuest][populate]=*",
  );
  return res.data.data?.homeGuest || [];
};

export const getCityBySlug = async (slug) => {
  const res = await api.get(`/cities?filters[slug][$eq]=${slug}&populate=*`);
  return res.data.data?.[0];
};

export const getCitySlugs = async () => {
  const res = await api.get("/cities?fields[0]=slug");
  return res.data.data?.map((city) => city.slug || city.attributes?.slug) || [];
};

export const searchCities = async (query) => {
  const res = await api.get(
    `/cities?filters[name][$containsi]=${query}&populate=*`,
  );
  return res.data.data;
};
