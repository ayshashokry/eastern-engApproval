import axios from "axios";
export const fetchTablesData = async (endPoint, userToken) => {
  let result = await axios.get(`${window.ApiUrl}/EngineeringCompany/${endPoint}?pageSize=12`,
    {
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${userToken}`,
      },
    }
  );

  return result;
};
