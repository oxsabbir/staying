import api from "@/lib/api";

export const fetchCities = async () => {
  const res = await api.get("/cities?populate=coverImage");
  return res.data.data;
};
