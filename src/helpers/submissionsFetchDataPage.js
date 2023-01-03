import axios from "axios";
export const fetchTablesDataPage = async (endPoint, userToken,page) => {
  let result = await axios.get(`${window.ApiUrl}/EngineeringCompany/${endPoint}?page=${
    page - 1
  }&pageSize=12`,
    {
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${userToken}`,
      },
    }
  );

  return result;
};
