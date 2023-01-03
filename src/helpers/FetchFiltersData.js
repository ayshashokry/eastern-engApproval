import axios from "axios";
export const FetchFiltersData = async (endPoint, userToken) => {
  let result = await axios.get(`${window.ApiUrl}/api/${endPoint}`, {
    headers: {
      "content-type": "application/json",
      Authorization: `bearer ${userToken}`,
    },
  });

  return result;
};
