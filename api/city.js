import api from "@/lib/api";

export const fetchCities = async () => {
  const res = await api.get(
    "/landing-page?populate[featuredCity][populate]=coverImage",
  );
  console.log(res);
  return res.data.data;
};
