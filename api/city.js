import api from "@/lib/api";

export const fetchCities = async () => {
  const res = await api.get(
    "/landing-page?populate[featuredCity][populate]=coverImage",
  );
  return res.data.data;
};

export const getCityBySlug = async (slug) => {
  const res = await api.get(`/cities?filters[slug][$eq]=${slug}&populate=*`);
  return res.data.data?.[0];
};

export const getCitySlugs = async () => {
  const res = await api.get("/cities?fields[0]=slug");
  return res.data.data?.map((city) => city.slug || city.attributes?.slug) || [];
};
