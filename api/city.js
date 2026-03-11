import api from "@/lib/api";

export const fetchCities = async () => {
  const res = await api.get(
    "/landing-page?populate[featuredCity][populate]=coverImage",
  );
  return res.data.data;
};
