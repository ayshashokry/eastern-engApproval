import axios from "axios";
export const changeOfficeStatus = async (
  endPoint,
  userToken,
  id,
  comment,
  officeData
) => {
  let result = await axios.post(
    `${window.ApiUrl}/engineercompany/${endPoint}`,
    { json_file: officeData, id: id, comment: comment },
    {
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${userToken}`,
      },
    }
  );

  return result;
};
