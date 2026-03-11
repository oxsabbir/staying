import api from "@/lib/api";

export const getProperties = async () => {
  const res = await api.get("/properties");
  return res.data.data;
};

export const getProperty = async (propertyId) => {
  const res = await api.get(`/properties/${propertyId}`);
  return res.data.data;
};
