import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const FetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "x-rapidapi-host": "bayut.p.rapidapi.com",
      "x-rapidapi-key": "8796049104msh3e01ac65bdfdc79p10a08fjsn6dca1ff11004",
    },
  });
  return data;
};
