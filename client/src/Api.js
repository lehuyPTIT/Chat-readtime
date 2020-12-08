import axios from "axios";

export const getApi = async (url) => {
  const res = await axios.get(url, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  return res;
};
