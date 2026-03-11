import api from "@/lib/api";

export const getProperties = async () => {
  const res = await api.get("/properties");
  return res.data.data;
};

export const getProperty = async (propertyId) => {
  const res = await api.get(`/properties/${propertyId}`);
  return res.data.data;
};

export const getPropertiesByCity = async (citySlug) => {
  const res = await api.get(
    `/properties?filters[city][slug][$eq]=${citySlug}&populate=*`,
  );
  return res.data.data;
};

export const getPropertyBySlug = async (slug) => {
  const res = await api.get(`/properties?filters[slug][$eq]=${slug}&populate=*`);
  return res.data.data?.[0];
};

export const getPropertySlugs = async () => {
  const res = await api.get("/properties?fields[0]=slug");
  return res.data.data?.map((p) => p.slug || p.attributes?.slug) || [];
};
